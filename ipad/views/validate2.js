define(['View', getViewTemplatePath('validate2')], function (View, viewhtml) {

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
