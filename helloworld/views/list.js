define(['View', getViewTemplatePath('list')], function (View, viewhtml) {


  

  return _.inherit(View, {
    onCreate: function () {
      console.log('onCreate');
      this.$el.html(viewhtml);
    },

    events: {
      'click button': function (e) {
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
