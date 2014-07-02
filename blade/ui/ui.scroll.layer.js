define(['UILayer', getAppUITemplatePath('ui.scroll.layer'), 'UIScroll'], function (UILayer, template, UIScroll) {


  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;

      this.datamodel = {
        title: 'scrollLayer',
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

      this.html = [
      //      '<div>',
          '<p>这里的内容可以从model中获取的，这里只是作一个演示，所以就写在本地了</p>',
          '<p>去服务器里获取数据后返回这里，拼成想要的html代码，填充到dom元素中</p>',
          '<p>这里的内容可以从model中获取的，这里只是作一个演示，所以就写在本地了</p>',
          '<p>去服务器里获取数据后返回这里，拼成想要的html代码，填充到dom元素中</p>',
          '<p>这里的内容可以从model中获取的，这里只是作一个演示，所以就写在本地了</p>',
          '<p>去服务器里获取数据后返回这里，拼成想要的html代码，填充到dom元素中</p>',
          '<p>这里的内容可以从model中获取的，这里只是作一个演示，所以就写在本地了</p>',
          '<p>去服务器里获取数据后返回这里，拼成想要的html代码，填充到dom元素中</p>'
      //          , '</div>'
      ].join('');

      this.maxHeight = 300;
      this.sheight = 0;

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
      //      this.scroller = this.$('.cui-select-view');
      s = '';
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
      this.initWrapperHeight();
    },

    initWrapperHeight: function () {
      var h = 0;
      this.sheight = this.html.height()
      h = Math.min(this.sheight, this.maxHeight);
      this.swrapper.height(h);
    },

    //内部高度变化时要刷新操作
    refreshHeight: function () {
      this.initWrapperHeight();
      if (this.scroll && this.scroll.refresh) this.scroll.refresh();
      this._initScroll();
    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    _initScroll: function () {
      if (this.scroll && this.scroll.destory) this.scroll.destory();
      if (this.sheight >= this.maxHeight) {
        this.scroll = new UIScroll({
          wrapper: this.swrapper,
          scroller: this.html
        });
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
