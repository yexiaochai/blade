
define(['UILayer', getAppUITemplatePath('ui.inputclear'), 'UIInputClear'], function (UILayer, template, UIInputClear) {

  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;

      this.needMask = false;

      this.datamodel = {
        parent: 'body',                       //父级，就是为了委托绑定；
        container: '',                        //容器
        offset: {},                           // 相对input的位置
        clearClass: 'clear-input'         //删除按钮样式class的名称
      };

      //相对于哪个元素
      this.triggerEl = null;

      this.events = {
        'click .clear-input': 'clickAction'
      };

      this.onClearAction = function () {

      };

    },

    clickAction: function (e) {


    },

    //设置删除按钮的位置
    reposition: function (clearBtn) {
      if (!this.triggerEl) return;
      var offset = this.triggerEl.offset();
      var top;

      top = (offset.top) + 'px';
      left = (offset.left) + 'px';

      this.el.css({
        top: top,
        left: left
      });
      var s = '';
    },

    initialize: function ($super, opts) {
      $super(opts);
      this.bindInputEvent();
    },

    initElement: function () {
      this.el = this.$('.clear-input');
    },

    bindInputEvent: function () {
      if (!this.triggerEl || !this.el[0]) return;

      this.triggerEl.on('focus', $.proxy(function () {
        this.show();

      }, this));

      this.triggerEl.on('blur', $.proxy(function () {
        this.hide();

      }, this));

    },

    addEvent: function ($super) {
      $super();


      this.on('onCreate', function () {
        this.$el.removeClass('cui-layer');

      });

      this.on('onShow', function () {
        this.setzIndexTop(this.el);
        this.el.show();

        s = '';
      });

      this.on('onHide', function () {
        //              this.unBindInputEvent();
        this.el.hide();

      });

    }


  });

});
