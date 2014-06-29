define(['View', getViewTemplatePath('index'), 'UIAlert', 'UIMask', 'UILoading', 'UIReLoading', 'UIToast'], function (View, viewhtml, UIAlert, UIMask, UILoading, UIReLoading, UIToast) {

  window.UIAlert = UIAlert;
  window.UIMask = UIMask;
  window.UILoading = UILoading;
  window.UIReLoading = UIReLoading;
  window.UIToast = UIToast;

  var t = new UIToast()
  t.setDatamodel('111', function (e) {
    var ssss = '';

  });
  t.show()


  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },

    events: {
      'click button': function (e) {
        this.forward('list');
      }
    },

    onPreShow: function () {



      //      a.setContent('测试');

      this.turning();
    },

    onShow: function () {

    },

    onHide: function () {

    }

  });
});
