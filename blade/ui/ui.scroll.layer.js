/*
******bug******
宽度问题需要统一解决方案
容器样式问题，没有好的解决方案
*/
define(['UILayer', 'text!T_UIScrollLayer', 'UIScroll'], function (UILayer, template, UIScroll) {

  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;
      //      this.addUIStyle(style);

      this.openShadowDom = false;

      this.title = '';
      this.btns = [
          { name: 'cancel', className: 'js_cancel' },
          { name: 'ok', className: 'js_ok' }
        ];

      //事件机制
      this.addEvents({
        'click .js_ok': 'okAction',
        'click .js_cancel': 'cancelAction',
        'click .js_close': 'closeAction'
      });

      //body内部需要装载的dom结构，可能是包装过的dom结构
      this.html = null;

      this.maxHeight = 300;

      //传入dom字符串所占的高度
      this.sheight = 0;
      this.scrollOpts = {};

    },

    getViewModel: function () {
      return this._getDefaultViewModel(['title', 'btns']);
    },

    okAction: function () {
      console.log('ok');
    },

    cancelAction: function () {
      console.log('cancel');
    },

    closeAction: function () {
      this.hide();
    },

    initElement: function () {
      this.swrapper = this.$('.js_body');
      this.footer = this.$('.js_footer');
    },

    initSize: function () {
      if (!this.html) return;

      this.html = $(this.html);

      if (this.html.length > 1) this.html = $('<div></div>').append(this.html);

      this.html.css({
        'position': 'absolute'
      });

      this.swrapper.append(this.html);
      this._initWrapperSize();
    },

    _initWrapperSize: function () {
      var h = 0;
      this.sheight = this.html.height()
      h = Math.min(this.sheight, this.maxHeight);
      this.swrapper.height(h);

      this.footer.height(this.footer.height());

      if (this.width)
        this.$root.width(this.width);

    },

    //内部高度变化时要刷新操作
    refreshHeight: function () {
      this._initWrapperSize();
      if (this.scroll && this.scroll.refresh) this.scroll.refresh();
      this._initScroll();
    },

    _initScroll: function () {
      if (this.scroll && this.scroll.destory) this.scroll.destory();
      if (this.sheight >= this.maxHeight) {
        this.scrollOpts.wrapper = this.swrapper;
        this.scrollOpts.scroller = this.html;
        this.scroll = new UIScroll(this.scrollOpts);
      }
    },

    addEvent: function ($super) {
      $super();
      this.on('onShow', function () {
        this.initSize();
        this._initScroll();
        //        this.handleShadowContainer();
      }, 1);

      this.on('onHide', function () {
        if (this.scroll) {
          this.scroll.destroy();
          this.scroll = null;
        }
      });

    }

  });


});
