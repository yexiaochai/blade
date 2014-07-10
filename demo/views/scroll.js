define(['View', getViewTemplatePath('scroll'), 'UIScroll'], function (View, viewhtml, UIScroll) {
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
    },
    onHide: function () {
    }
  });
});
