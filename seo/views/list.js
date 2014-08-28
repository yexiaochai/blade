define(['AbstractView', getViewTemplatePath('list')], function (View, viewhtml) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);

    },

    events: {

    },

    onPreShow: function () {

      this.turning();
    },

    onAfterShow: function () {

    },

    onHide: function () {

    }

  });
});
