
/*
用于继承的类，会自动垂直居中

*/
define(['UIView', 'text!C_UIMask'], function (UIView, style) {
  'use strict';

  return _.inherit(UIView, {
    //默认属性
    propertys: function ($super) {
      $super();
      this.setUIType('mask');
      this.resetDefaultProperty();

    },

    resetDefaultProperty: function () {
      this.events = {};
      this.uiStyle[0] = style;

      //      this.animateInClass = 'cm-up-in';
      this.animateOutClass = 'cm-overlay-out';

      //阻止浏览器默认事件，这里是阻止滚动
      this.addEvents({
        'touchmove': '_preventDefault'
      });
    },

    setRootStyle: function () {
      var h = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

      this.$el.addClass('cm-overlay');

      this.$el.css({
        height: h + 'px'
      });

      this.$root.css({
        position: 'fixed',
        width: '100%',
        left: '0px',
        top: '0px'
      });
    },

    addEvent: function ($super) {
      $super();

      this.on('onShow', function () {
        this.setRootStyle();
        this.setzIndexTop();
      });

    }

  });


});
