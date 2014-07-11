define(['View', getViewTemplatePath('slider'),'UISlider'], function (View, viewhtml,UISlider) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },

    events: {
      'click .demo1': 'demo1'
    },

    demo1: function () {

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
