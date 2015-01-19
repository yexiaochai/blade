define(['View', getViewTemplatePath('toast'), 'UIToast'], function (View, viewhtml, UIToast) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },

    events: {
      'click .fxdemo': 'fxdemo',
      'click .fxdemo1': 'fxdemo1',
      'click .fxdemo2': 'fxdemo2',
      'click .fxdemo3': 'fxdemo3',


      'click .demo1': 'demo1',
      'click .demo2': 'demo2',
      'click .demo3': 'demo3',
      'click .demo4': 'demo4',
      'click .demo5': 'demo5'
    },

    fxdemo: function () {
      this.showToast({
        datamodel: {
          content: '框架使用'
        }
      });
    },

    fxdemo1: function () {
      this.showToast({
        datamodel: {
          content: '框架使用-不带蒙版'
        },
        needMask: false
      });
    },

    fxdemo2: function () {
      this.showToast({
        datamodel: {
          content: '带蒙版，点击蒙版不关闭，5秒关闭'
        },
        maskToHide: false,
        hideSec: 5000
      });
    },

    fxdemo3: function () {
      this.showToast({
        datamodel: {
          content: '动画'
        },
        animateShowAction: function (el) {
          el.css({
            '-webkit-transform': 'translate(0, -50%)',
            transform: 'translate(0,  -50%)'
          });
          el.show().animate({
            '-webkit-transform': 'translate(0, 0)',
            transform: 'translate(0, 0)'
          }, 200, 'ease-in-out', $.proxy(function () {
            this.$el.css({
              '-webkit-transform': '',
              transform: ''
            });
          }, this));
        }
      });
    },

    demo1: function () {
      if (!this.toast1) {
        this.toast1 = new UIToast({
          datamodel: {
            content: 'content'
          },
          TIMERRES: true
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
          },
          hideSec: 5000

        });
      }
      this.toast5.show();
      this.toast5.setDatamodel('setDatamodel', 2000, function () {
        console.log('i am setDatamodel\'s hiden');
      });
    },

    onPreShow: function () {
      this.turning();
    },

    onShow: function () {
    },

    onHide: function () {

    }

  });
});
