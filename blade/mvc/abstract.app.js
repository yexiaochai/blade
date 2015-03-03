/*
这里应该提供一个机制，设置已经装载了的dom结构

*/

define(['UIHeader', 'UILoadingLayer'], function (UIHeader, UILoadingLayer) {

  return _.inherit({
    propertys: function () {
      //view搜索目录
      this.viewRootPath = 'demo/views/';

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

      this.viewMapping = {};

      //结构是否创建好
      this.isCreate = false;

      //app状态
      this.status = 'init';

      //框架装载的包裹层，默认为body
      this.$wrapper = $('body');

      //框架根节点
      this.$mainframe = $('#main');

      this.interface = ['forward', 'back', 'loadSubView'];

      //当前模式
      this.appmode = 'mobile';

      this.loading = new UILoadingLayer({
         content: '正在拉取js...',
         closeBtn: true
      });

    },

    initialize: function (options) {
      this.propertys();
      this.setOption(options);
      this.createViewPort();

      //首次必须执行该方法加载相关view
      this.loadViewByUrl();

      //载入结束后绑定hashchange事件
      this.buildEvent();

    },

    setOption: function (options) {
      _.extend(this, options);
    },

    //创建dom结构
    createViewPort: function () {
      if (this.isCreate) return;

      var html = '', header = '<div class="header-wrapper"></div>', viewport = '<div class="viewport-wrapper"></div>';

      //首先搜索页面上是否具有main标签
      if (!this.$mainframe[0]) {
        html = [
          '<div class="main">',
          '</div>'
        ].join('');
        this.$mainframe = $(html);
        this.$wrapper.append(this.$mainframe);
      }

      //
      this.$mainframe.html(header + viewport);
      this.$header = this.$mainframe.find('.header-wrapper');
      this.$viewport = this.$mainframe.find('.viewport-wrapper');

      //实例化全局使用的header，这里好像有点不对
      this.header = new UIHeader({
        wrapper: this.$header
      });

      this.isCreate = true;
    },

    buildEvent: function () {

      if (this.hasPushState) {
        $(window).bind('popstate', _.bind(this.loadViewByUrl, this));
      } else {
        $(window).bind('hashchange', _.bind(this.loadViewByUrl, this));
      }
    },

    loadViewByUrl: function (e) {

      this.parseUrl();

      this.switchView(this.viewId);

    },

    //处理URLhash
    parseUrl: function () {
      var url = decodeURIComponent(location.href).toLowerCase();
      var viewId = this.getViewIdRule(url);

      viewId = viewId || this.defaultView;
      this.viewId = viewId;

      this.request = {
        viewId: viewId,
        path: url
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

        this.curView.show();
        this.lastView && this.lastView.hide();
      } else {
        this.loading.show();

        //重来没有加载过view的话需要异步加载文件
        //此处快速切换可能导致view文件未加载结束，而已经开始执行其它view的逻辑而没有加入dom结构
        this.loadView(path, function (View) {
          if ($('[page-url="' + id + '"]').length > 0) {
            return;
          }

          this.curView = new View({
            APP: this,
            wrapper: this.$viewport
          });

          //设置网页上的view标志
          this.curView.$root.attr('page-url', id);

          //保存至队列
          this.views[id] = this.curView;

          //首次进入时候，若是defaultView的话，不应该记录
          var lastViewName = typeof lastView != 'undefined' ? lastView.viewname : null;

          this.curView.show();
          this.lastView && this.lastView.hide();
          this.loading.hide();

        });
      }
    },

    //加载view
    loadView: function (path, callback) {
      var self = this;
      requirejs([this.buildUrl(path)], function (View) {
        callback && callback.call(self, View);
      });
    },

    buildUrl: function (path) {

      if (this.appmode == 'ipad') {
        path = path + '.ipad';
      }

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

    }

  });

});
