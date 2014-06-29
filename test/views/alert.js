define(['View', 'UIAlert', 'UIMask', getViewTemplatePath('alert')], function (View, UIAlert, UIMask, viewhtml) {
  window.UIMask = UIMask;

  return _.inherit(View, {
    onCreate: function () {
      console.log('onCreate');
      this.$el.html(viewhtml);
    },

    events: {
      'click .widget': function (e) {
        var uiAlert = new UIAlert({
          title: 'xm alert',
          content: 'xm hello iam alert widget'
        });
        uiAlert.show();

    /*    */
      },
      'click .back': function() {
        this.back('index');
      }
    },

    onPreShow: function () {
      console.log('onPreShow');

      this.turning();
    },

    onAfterShow: function () {
      console.log('onAfterShow');

    },

    onHide: function () {
      console.log('onHide');

    }

  });
});
