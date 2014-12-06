define(['View', getViewTemplatePath('sample'), 'UIGroupList'], function (View, viewhtml, UIGroupList) {

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
