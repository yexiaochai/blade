define(['View', 'UIReLoading', getViewTemplatePath('reloading')], function (View, UIReLoading, viewhtml) {

  return _.inherit(View, {
    onCreate: function () {
      console.log('onCreate');
      this.$el.html(viewhtml);
    },

    events: {
      'click .widget0': function (e) {
        var reloading = new UIReLoading({
          datamodel: {
            text: 'nima'
          }
        });

        reloading.show();
      },

      'click .widget1': function (e) {
        var reloading = new UIReLoading({
          datamodel: {
            text: 'nima'
          }
        });

        reloading.show();

        reloading.setDatamodel('动态的', function() {
          alert('closeing');
          this.hide();
        });
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
