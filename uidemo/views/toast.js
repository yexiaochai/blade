define(['View', getViewTemplatePath('toast'), 'UIToast'], function (View, viewhtml, UIToast) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);

    },

    events: {
      'click .demo1': function () {

      },

      'click .demo1': function () {
        if (!this.toast1) {
          this.alert1 = new UIToast({
            datamodel: {
              content: 'content01'
            }
          });
        }
        this.alert1.show();
      },
      'click .demo2': function () {
        

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
