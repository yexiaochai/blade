define(['View', getViewTemplatePath('index'), 'UIAlert', 'UIMask', 'UILoading'], function (View, viewhtml, UIAlert, UIMask, UILoading) {

  window.UIAlert = UIAlert;
  window.UIMask = UIMask;
  window.UILoading = UILoading;


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
