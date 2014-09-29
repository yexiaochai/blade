define(['UILayer', getAppUITemplatePath('ui.scroll.layer'), 'UIScroll'], function (UILayer, template, UIScroll) {


  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;

      this.datamodel = {
        title: '',
        btns: [
          { name: 'cancel', className: 'cui-btns-cancel' },
          { name: 'ok', className: 'cui-btns-ok' }
        ]
      };

      //事件机制
      this.events = {
        'click .cui-btns-ok': 'okAction',
        'click .cui-btns-cancel': 'cancelAction',
        'click .cui-top-close': 'closeAction'
      };

      //body内部需要装载的dom结构，可能是包装过的dom结构
      this.html = null;

      this.html = '';

      this.maxHeight = 300;
      this.sheight = 0;
      this.scrollOpts = {};

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
      this.swrapper = this.$('.cui-bd');
      this.box_wrapper = this.$('.cui-pop-box');
    },

    initSize: function () {
      if (!this.html) return;

      this.html = $(this.html);

      if (this.html.length > 1) this.html = $('<div></div>').append(this.html);

      this.html.css({
        'background-color': 'white',
        'width': '100%',
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

      if (this.width)
        this.box_wrapper.width(this.width);

    },

    //内部高度变化时要刷新操作
    refreshHeight: function () {
      this._initWrapperSize();
      if (this.scroll && this.scroll.refresh) this.scroll.refresh();
      this._initScroll();
    },

    initialize: function ($super, opts) {
      $super(opts);
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
