define([], function () {

  return _.inherit({
    propertys: function () {
      //view搜索目录
      this.viewRootPath = 'app/views/';
      //默认view
      this.defaultView = 'index';
      //请求对象
      this.request;
      //当前视图路径
      this.viewId;
      //主框架
      this.mainframe;
      //视图框架
      this.viewport;
      //视图集
      this.views = {};
      //当前视图
      this.curView;
      //最后访问视图视图
      this.lastView;

      //结构是否创建好
      this.isCreate = false;
      //历史记录
      this.history = [];

      //app状态
      this.status = 'init';

      this.animations = {};

      //是否使用动画，这个属性只能控制单次是否开启动画
      this.isAnimat = true;

      //向前动画名
      this.animForwardName = 'slideleft';
      this.animBackwardName = 'slideright';
      this.animNoName = 'noAnimate';

      //pushState的支持能力
      this.hasPushState = !!(window.history && window.history.pushState);

      //动画名
      this.animatName = null;

      this.viewMapping = {};

      this.container = $('body');

      this.interface = ['forward', 'back'];

    },

    initialize: function (options) {
      this.propertys();
      this.setOption(options);
      this.createViewPort();
      this.buildEvent();

      //首次将加载时,放入history
      this.pushHistory();

      //首次必须执行该方法加载相关view
      this.start();

    },

    setOption: function (options) {
      _.extend(this, options);
    },

    //创建dom结构
    createViewPort: function () {
      if (this.isCreate) return;
      var html = [
        '<div class="main">',
        '<div class="main-viewport"></div>',
        '</div>'
      ].join('');
      this.mainframe = $(html);
      this.viewport = this.mainframe.find('.main-viewport');

      this.container.empty();
      this.container.append(this.mainframe);
      this.isCreate = true;
    },

    buildEvent: function () {

      if (this.hasPushState) {
        $(window).bind('popstate', _.bind(this.loadViewByUrl, this));
      } else {
        $(window).bind('hashchange', _.bind(this.loadViewByUrl, this));
      }
    },

    //第一次非hashChange触发
    start: function () {
      this.loadViewByUrl();
    },

    loadViewByUrl: function (e) {

      if (!this.animatName) this.animatName = this.animBackwardName;

      this.parseUrl();

      this.switchView(this.viewId);

    },

    //处理URLhash
    parseUrl: function () {
      var url = decodeURIComponent(location.href).toLowerCase();
      var viewId = this.getViewIdRule(url);
      var query = _.getUrlParam(url);

      viewId = viewId || this.defaultView;
      this.viewId = viewId;

      this.request = {
        viewId: viewId,
        path: url,
        query: query
      };

    },

    //根据根据id以及页面的类
    //定义view的turing方法，这里不是直接放出去，而是通过app接口放出，并会触发各个阶段的方法
    //注意，这里是传递id，有可能乱跳，
    switchView: function (path) {
      var id = path;
      var curView = this.views[id];

      //切换前的当前view，马上会隐藏
      var lastView = this.curView;

      //如果当前view存在则触发其onHide事件，做资源清理
      //但是如果当前view就是 马上要访问的view的话，这里就不会触发他的onHide事件
      //所以lastview可能并不存在
      if (lastView && lastView != curView) {
        this.lastView = lastView;
      }

      //如果当前view存在，则执行请onload事件
      if (curView) {

        //如果当前要跳转的view就是当前view的话便不予处理
        //这里具体处理逻辑要改*************************************
        if (curView == this.curView) {
          return;
        }

        //这里有一个问题，view与view之间并不需要知道上一个view是什么，下一个是什么，这个接口应该在app中
        this.curView = curView;

        var lastViewName = (lastView || curView).viewname;

        this.curView.onPreShow();

      } else {

        //重来没有加载过view的话需要异步加载文件
        //此处快速切换可能导致view文件未加载结束，而已经开始执行其它view的逻辑而没有加入dom结构
        this.loadView(path, function (View) {
          if ($('[page-url="' + id + '"]').length > 0) {
            return;
          }
          curView = new View(this, id);

          //保存至队列
          this.views[id] = curView;
          //这个是唯一需要改变的
          curView.turning = _.bind($.proxy(function () {
            //            this.createViewPort();
            //动画会触发inView的show outView 的hide
            this.startAnimation(function (inView, outView) {
              //防止view显示错误，后面点去掉
              $('.sub-viewport').hide();
              //防止白屏
              inView.$el.show();
              this.animatName = null;
            });

          }, this), this);

          this.curView = curView;

          //首次进入时候，若是defaultView的话，不应该记录
          var lastViewName = typeof lastView != 'undefined' ? lastView.viewname : null;

          this.curView.onPreShow();

        });
      }
    },

    //动画相关参数，这里要做修改，给一个noAnimat
    startAnimation: function (callback) {
      var inView = this.curView;
      var outView = this.lastView;

      //在此记录outview的位置，较为靠谱，解决记录位置不靠谱问题
      if (outView) outView.setScrollPos(window.scrollX, window.scrollY);

      if (!this.isAnimat) this.animatName = this.animNoName;

      if (this.animations[this.animatName] && outView) {
        this.animations[this.animatName].call(this, inView, outView, callback, this)
      } else {

        if (outView) outView.hide();
        inView.show();
        this.animatName = null;
        callback && callback.call(this, inView, outView);
      }
      //此参数为一次性，调用一次后自动打开动画
      this.isAnimat = true;
      this.animatName = null;

    },

    //加载view
    loadView: function (path, callback) {
      var self = this;
      requirejs([this.buildUrl(path)], function (View) {
        callback && callback.call(self, View);
      });
    },

    buildUrl: function (path) {
      var mappingPath = this.viewMapping[path];
      return mappingPath ? mappingPath : this.viewRootPath + path;
    },

    //@override
    getViewIdRule: function (url) {
      var viewId = '', hash = '', h, vp;

      if (this.hasPushState) {

        viewId = _.getUrlParam(url, 'viewid');

      } else {
        viewId = url.replace(/^[^#]+(#(.+))?/g, '$2').toLowerCase().replace(/^#+/i, '');
        h = /^([^?&|]*)(.*)?$/i.exec(viewId);
        vp = h[1] ? h[1].split('!') : [];
        viewId = (vp.shift() || '').replace(/(^\/+|\/+$)/i, '');
      }
      return viewId;
    },

    //@override
    setUrlRule: function (viewId, replace, param) {
      if (this.hasPushState) {
        var k, loc = window.location.href, str = '', url = '';
        if (param) {
          for (k in param) {
            str += '&' + k + '=' + param[k];
          }
        }
        url = loc.indexOf('?') ? (loc.substr(0, loc.indexOf('?')) + '?viewid=' + viewId) : (loc + '?viewid=' + viewId);
        if (replace) {
          history.replaceState('', {}, url + str);
        } else {
          history.pushState('', {}, url + str);
        }

      } else {
        if (replace) {
          window.location.replace(('#' + viewId).replace(/^#+/, '#'));
        } else {
          window.location.href = ('#' + viewId).replace(/^#+/, '#');
        }
      }

    },

    //此处需要一个更新逻辑，比如在index view再点击到index view不会有反应，下次改**************************
    forward: function (viewId, opts) {
      if (!viewId) return;
      opts = opts || {};

      var replace = opts.replace,
      isNotAnimat = opts.isNotAnimat;
      param = opts.param;
      viewId = viewId.toLowerCase();

      if (isNotAnimat) this.isAnimat = false;
      this.animatName = opts.animatName || this.animForwardName;

      this.setUrlRule(viewId, replace, param);
      //前进时填记录
      this.pushHistory();

      if (this.hasPushState) {
        this.loadViewByUrl();
      }
    },

    back: function (viewId, opts) {
      opts = opts || {};
      var isNotAnimat = opts.isNotAnimat;
      if (isNotAnimat) this.isAnimat = false;
      this.animatName = this.animBackwardName;

      if (viewId) {
        opts.animatName = this.animBackwardName;
        this.forward(viewId, opts)
      } else {
        if (window.history.length == 1) {
          this.forward(this.defaultView, opts)
        } else {
          history.back();
        }
      }

    },

    pushHistory: function () {
      var href = window.location.href;
      this.history.push(href);
    }

  });

});
