define([], function () {

  var Appliction = _.inherit({
    propertys: function () {
      //view搜索目录
      this.viewRootPath = 'app/views/';
      //默认view
      this.defaultView = 'index';
      //请求对象
      this.request;
      //当前视图路径
      this.viewpath;
      //主框架
      this.mainframe;
      //视图框架
      this.viewport;
      //状态框架
      this.statedom;
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
      //hash的监听状态
      this.stopListening = false;

      //上一次hash
      this.lastHash = '';
      //上一次完整hash
      this.lashFullHash = '';
      //hash是否改变
      this.isChangeHash = false;

      this.animations = {};
      //是否使用动画，这个属性只能控制单次是否开启动画
      this.isAnimat = true;

      //向前动画名
      this.animForwardName = 'slideleft';
      this.animBackwardName = 'slideright';
      this.animNoName = 'noAnimate';

      //动画名
      this.animatName = this.animNoName;

      this.path = [];
      this.query = {};
      this.viewMapping = {};

      this.container = $('body');

      this.interface = [ 'forward', 'back' ];

    },

    initialize: function (options) {
      this.propertys();
      this.setOption(options);
      this.createViewPort();
      this.buildEvent();

      //首次将加载时,放入history
      this.pushHistory();

      //首次必须执行该方法加载相关view
      this.onHashChange();

    },
    setOption: function (options) {
      _.extend(this, options);
    },

    buildEvent: function () {
//      requirejs.onError = function (e) {
//        if (e && e.requireModules) {
//          for (var i = 0; i < e.requireModules.length; i++) {
//            console.log('抱歉，当前的网络状况不给力，请刷新重试!');
//            break;
//          }
//        }
//      };

      $(window).bind('hashchange', _.bind(this.onHashChange, this));

    },

    onHashChange: function () {

      //首次为false，不在监听时候才能触发_onHashChange 切换view
      if (!this.stopListening) {
        var url = decodeURIComponent(location.href).replace(/^[^#]+(#(.+))?/g, '$2').toLowerCase();
        this._onHashChange(url);
      }
    },

    _onHashChange: function (url, isForward) {
      url = url.replace(/^#+/i, '');

      this.localObserver(this.parseHash(url), isForward);
    },
    //处理URLhash
    parseHash: function (hash) {
      var fullhash = hash,
        hash = hash.replace(/([^\|]*)(?:\|.*)?$/img, '$1'),
        h = /^([^?&|]*)(.*)?$/i.exec(hash),
        vp = h[1] ? h[1].split('!') : [],
        viewpath = (vp.shift() || '').replace(/(^\/+|\/+$)/i, ''),
        path = vp.length ? vp.join('!').replace(/(^\/+|\/+$)/i, '').split('/') : this.path;

      this.isChangeHash = !!(!this.lastHash && fullhash === this.lashFullHash) || !!(this.lastHash && this.lastHash !== hash);

      this.lastHash = hash;
      this.lashFullHash = fullhash;
      return {
        viewpath: viewpath,
        path: path,
        query: _.getUrlParam(fullhash),
        root: location.pathname + location.search,
        fullhash: fullhash
      };
    },

    //hashchange观察点函数，处理url，动画参数
    localObserver: function (req, isForward) {
      this.animatName = isForward ? this.animForwardName : this.animBackwardName;

      this.request = req;
      this.viewpath = this.request.viewpath || this.defaultView;
      this.request.viewpath = this.viewpath;
      this.switchView(this.viewpath);
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
        if (curView == this.curView && this.isChangeHash == false) {
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
          curView.turning = _.bind(function () {
            //            this.createViewPort();
            //动画会触发inView的show outView 的hide
            this.startAnimation(function (inView, outView) {
              //防止view显示错误，后面点去掉
              $('.sub-viewport').hide();
              //防止白屏
              inView.$el.show();

            });

          }, this);

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

      if (this.animations[this.animatName]) {
        this.animations[this.animatName].call(this, inView, outView, callback, this)
      } else {

        if (outView) outView.hide();
        inView.show();

        callback && callback.call(this, inView, outView);
      }
      //此参数为一次性，调用一次后自动打开动画
      this.isAnimat = true;
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

    lastUrl: function () {
      if (this.history.length < 2) {
        return document.referrer;
      } else {
        return this.history[this.history.length - 2];
      }
    },

    startObserver: function () {
      this.stopListening = false;
    },

    endObserver: function () {
      this.stopListening = true;
    },

    forward: function (url, replace, isNotAnimat) {
      url = url.toLowerCase();
      if (isNotAnimat) this.isAnimat = false;
      this.endObserver();

      if (replace) {
        window.location.replace(('#' + url).replace(/^#+/, '#'));
      } else {
        window.location.href = ('#' + url).replace(/^#+/, '#');
      }

      //前进时填记录
      this.pushHistory();

      this._onHashChange(url, true);

      setTimeout(_.bind(this.startObserver, this), 1);
    },

    back: function (url, isNotAnimat) {

      if (isNotAnimat) this.isAnimat = false;

      var referrer = this.lastUrl();
      //back时,弹出history中的最后一条记录 shbzhang 2014/5/20
      if (referrer) {
        this.history.pop();
      }

      if (url && (!referrer || referrer.indexOf(url) !== 0)) {
        //hash不支持中文，大bug
        //window.location.hash = url;
        window.location.href = ('#' + url).replace(/^#+/, '#');
      } else {
        url = this.request.query['refer'];
        if (url) {
          window.location.href = url;
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
  return Appliction;
});
