define(['View', getViewTemplatePath('index'), 'UIAlert', 'UIMask', 'UILoading', 'UIReLoading', 'UIToast', 'UINum', 'UISwitch', 'UIBubbleLayer', 'UITab', 'UIRadioList', 'UIScrollLayer', 'UISelect', 'UIGroupSelect'], function (View, viewhtml, UIAlert, UIMask, UILoading, UIReLoading, UIToast, UINum, UISwitch, UIBubbleLayer, UITab, UIRadioList, UIScrollLayer, UISelect, UIGroupSelect) {

  window.UIAlert = UIAlert;
  window.UIMask = UIMask;
  window.UILoading = UILoading;
  window.UIReLoading = UIReLoading;
  window.UIToast = UIToast;
  window.UINum = UINum;
  window.UIBubbleLayer = UIBubbleLayer;
  window.UITab = UITab;
  window.UIRadioList = UIRadioList;



  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },

    events: {
      'click .cui-cond-bar li': function (e) {
        var el = $(e.currentTarget);
        var index = parseInt(Math.random() * 4);
        var dir = (e.pageY > 200) ? 'down' : 'up';
        console.log(index);

        window.n = new UIBubbleLayer({
          triggerEl: el,
          datamodel: {
            dir: dir,
            index: index
          }
        });

        n.show();

      }
    },

    onPreShow: function () {

      var u = new UISelect();
      u.show();


      var u = new UIGroupSelect();
      u.show();
      window.u = u;
      //      a.setContent('测试');

      this.turning();
    },

    onShow: function () {

    },

    onHide: function () {

    }

  });
});
