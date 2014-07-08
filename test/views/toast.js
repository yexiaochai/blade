define(['View', 'UIToast', getViewTemplatePath('toast')], function (View, UIToast, viewhtml) {

  return _.inherit(View, {
    onCreate: function () {
      console.log('onCreate');
      this.$el.html(viewhtml);
    },

    events: {
      'click .widget0': function (e) {
        var toast = new UIToast({text:"woca"});
        toast.show();
      },

      'click .widget1': function (e) {
        var toast = new UIToast({
          datamodel: {
            text: 'hello toast'
          }
        });
        toast.show();
      },

      'click .widget2': function (e) {
        var toast = new UIToast();
        toast.show();
        setTimeout(function() {
          toast.setDatamodel('动态 toast' ,function() {
                alert('i am callback');
              }
          )
        }, 1000);
      },

      'click .back': function () {
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
