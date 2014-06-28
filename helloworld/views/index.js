define(['View', getViewTemplatePath('index'), 'UIAlert'], function (View, viewhtml, UIAlert) {

  window.UIAlert = UIAlert;

  return _.inherit(View, {
    onCreate: function () {
      console.log('onCreate');
      this.$el.html(viewhtml);
    },

    events: {
      'click button': function (e) {
        this.forward('list');
      }
    },

    onPreShow: function () {
      console.log('onPreShow');
      window.a = new UIAlert();
      a.show();


      //      a.setContent('测试');

      this.turning();
    },

    onShow: function () {
      console.log('onAfterShow');

    },

    onHide: function () {

    }

  });
});
