define(['View', getViewTemplatePath('index'), 'UIAlert', 'UIMask', 'UILoading', 'UIReLoading', 'UIToast'], function (View, viewhtml, UIAlert, UIMask, UILoading, UIReLoading, UIToast) {

  window.UIAlert = UIAlert;
  window.UIMask = UIMask;
  window.UILoading = UILoading;
  window.UIReLoading = UIReLoading;
  window.UIToast = UIToast;


  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },

    events: {
      'click button': function (e) {
        var target = $(e.target);
        this.forward(target.attr('hash'));
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
