
define(['UILayer', 'text!T_UIIdentitycard', 'text!C_UIIdentitycard'], function (UILayer, template, style) {
  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();

      this.template = template;
      this.addUIStyle(style);
      this.openShadowDom = false;

      this.needMask = false;

      this.addEvents({
        'click .js_ok': 'closeAction',
        'click .js_num_item li': 'itemAction'
      });

      this.animateInClass = 'cm-down-in';
      this.animateOutClass = 'cm-down-out';

      //目标元素，必填
      this.targetEl = null;
      this.emptyEl = $('<div style="height: 1000px"></div>');

    },

    deleteAction: function () {
      console.log('delete');
    },

    itemClickAction: function (val) {
      console.log(val);
    },

    itemAction: function (e) {
      var el = $(e.currentTarget);

      if (el.hasClass('js_item_del')) {
        this.deleteAction();
        return;
      }
      var val = el.html();
      this.itemClickAction(val);
    },

    closeAction: function () {
      this.hide();
    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    initElement: function () {
      this.el = this.$el;
    },

    _scrollToTarget: function () {
      var offset = this.targetEl.offset();
      window.scrollTo(0, offset.top - 50);
    },

    reposition: function () {
      this.$root.css({
        'position': 'fixed',
        'width': '100%',
        'left': '0',
        'bottom': '0'
      });
    },

    addEvent: function ($super) {
      $super();

      this.on('onShow', function () {
        $('body').append(this.emptyEl);
        this._scrollToTarget();
      });

      this.on('onHide', function () {
        this.emptyEl.remove();
      });
    }
  });

});
