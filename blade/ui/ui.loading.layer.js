
/*
用于继承的类，会自动垂直居中

*/
define(['UILayer', 'text!T_UILoadingLayer', 'text!C_UILoadingLayer'], function (UILayer, template, style) {
  'use strict';

  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      //类型为layer
      this.setUIType('loading');

      this.resetDefaultProperty();
    },

    resetDefaultProperty: function ($super) {
      $super();
      //html模板
      this.template = template;
      //只继承基类的重置css
      this.uiStyle[1] = style;

      this.closeBtn = false;
      this.content = '';

      this.addEvents({
        'click .js_close': 'closeAction'
      });

      this.maskToHide = false;
      this.hasPushState = false;

      this.closeAction = function (e) {
        this.hide();
      };
    },

    getViewModel: function () {
      return this._getDefaultViewModel(['closeBtn', 'content']);
    },

    reposition: function () {
      var w = '60px';
      if (this.closeBtn || this.content.length > 0) {
        w = '100px';
      }

      this.$root.css({
        'width': w
      });

      this.$root.css({
        'position': 'fixed',
        'left': '50%',
        'top': '50%',
        'margin-left': -(this.$el.width() / 2) + 'px',
        'margin-top': -(this.$el.height() / 2) + 'px'
      });

    }

  });


});
