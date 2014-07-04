define(['View', getViewTemplatePath('loading'), 'UILoading'], function (View, viewhtml, UILoading) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);

    },

    events: {
      'click .demo1': function () {

      },

      'click .demo1': function () {
        if (!this.loading1) {
          this.loading1 = new UILoading( );
        }
        this.loading1.show();
      } 
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
