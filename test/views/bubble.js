define(['View', 'UIBubbleLayer', getViewTemplatePath('bubble')], function (View, UIBubbleLayer, viewhtml) {

  return _.inherit(View, {
    onCreate: function () {
      console.log('onCreate');
      this.$el.html(viewhtml);
    },

    events: {
      'click .widget0': function (e) {

      },

      'click .back': function () {
        this.back('index');
      }
    },

    onPreShow: function () {
      console.log('onPreShow');
      var bubble = new UIBubbleLayer({
        wrapper: this.$el.find('.simple_bubble')
      });
      bubble.show();
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
