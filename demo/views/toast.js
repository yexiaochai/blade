define(['View', getViewTemplatePath('toast'), 'UIToast', 'res/style/highlight.pack'], function (View, viewhtml, UIToast, highlight) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },

    events: {
      'click .demo1': 'demo1',
      'click .demo2': 'demo2',
      'click .demo3': 'demo3',
      'click .demo4': 'demo4',
      'click .demo5': 'demo5'
    },

    demo1: function () {
      if (!this.toast1) {
        this.toast1 = new UIToast({
          datamodel: {
            content: 'content'
          },
          TIMERRES :  true
        });
      }
      this.toast1.show();
    },

    demo2: function () {
      if (!this.toast2) {
        this.toast2 = new UIToast({
          datamodel: {
            content: 'two second close'
          },
          hideSec: 2000

        });
      }
      this.toast2.show();
    },

    demo3: function () {
      if (!this.toast3) {
        this.toast3 = new UIToast({
          datamodel: {
            content: 'content01'
          },
          maskToHide: false
        });
      }
      this.toast3.show();
    },

    demo4: function () {
      if (!this.toast4) {
        this.toast4 = new UIToast({
          datamodel: {
            content: 'callback'
          },
          hideAction: function () {
            console.log('my self hideAction');
          }
        });
      }
      this.toast4.show();
    },

    demo5: function () {
      if (!this.toast5) {
        this.toast5 = new UIToast({
          datamodel: {
            content: 'content01'
          }
        });
      }
      this.toast5.show();
      this.toast5.setDatamodel('setDatamodel', function () {
        console.log('i am setDatamodel\'s hiden');
      });
    },

    onPreShow: function () {
      this.turning();
    },

    onShow: function () {
      hljs.initHighlightingOnLoad();
    },

    onHide: function () {

    }

  });
});
