//define(['View','UIAlert'], function (View,  UIAlert) {

define(function (require) {

  var View = require('View');
  var viewhtml = 'test';
  var UIAlert = require('UIAlert');


  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },

    events: {
    },

    onPreShow: function () {
      this.turning();
    },

    onShow: function () {
      window.sss = new UIAlert();
      sss.show();

    },

    onHide: function () {

    }

  });
});
