define(['View', getViewTemplatePath('alert'), 'UIAlert', 'res/style/highlight.pack'], function (View, viewhtml, UIAlert, highlight) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },

    events: {
      'click .demo1': 'demo1',    //简单使用
      'click .demo2': 'demo2',    //单按钮
      'click .demo3': 'demo3',    //三按钮
      'click .demo4': 'demo4',    //content定制化
      'click .demo5': 'demo5'     //执行setDatamodel
    },

    demo1: function () {
      if (!this.alert1) {
        this.alert1 = new UIAlert();
      }
      this.alert1.show();
    },

    demo2: function () {
      if (!this.alert2) {
        this.alert2 = new UIAlert({
          datamodel: {
            title: 'demo01',
            content: 'content01'
          },
          okAction: function () {
            alert('ok');
            this.hide();
          },
          cancelAction: function () {
            alert('cancel');
            this.hide();
          }
        });
      }
      this.alert2.show();
    },

    demo3: function () {
      if (!this.alert3) {
        this.alert3 = new UIAlert({
          datamodel: {
            title: 'demo02',
            content: 'content02',
            btns: [
              { name: '知道了', className: 'cui-btns-ok' },
              { name: '不知道', className: 'cui-btns-no' },
              { name: '未知', className: 'cui-btns-unknown' }
            ]
          },
          events: {
            'click .cui-btns-ok': 'okAction',
            'click .cui-btns-no': 'noAction',
            'click .cui-btns-unknown': 'unknownAction'
          },
          okAction: function () {
            alert('知道了');
            this.hide();
          },
          noAction: function () {
            alert('不知道');
            this.hide();
          },
          unknownAction: function () {
            alert('未知');
            this.hide();
          }
        });
      }
      this.alert3.show();
    },

    demo4: function () {
      if (!this.alert4) {
        this.alert4 = new UIAlert({
          datamodel: {
            title: 'demo02',
            content: 'content02',
            btns: [
              { name: '知道了', className: 'cui-btns-ok' }
            ]
          },
          events: {
            'click .cui-btns-ok': 'okAction'
          },
          okAction: function () {
            alert('知道了');
            this.hide();
          }
        });
      }
      this.alert4.show();
    },

    demo5: function () {
      this.alert5 = null;
      if (!this.alert5) {
        this.alert5 = new UIAlert();
      }
      this.alert5.show();

      setTimeout(function () {
        this.alert5.setDatamodel({
          title: 'setDatamodel',
          content: 'after 0.5s change setDatamodel'

        },
        function () {
          alert('i am ok');
          this.hide();
        },
        function () {
          alert('i am cancel');
          this.hide();
        });
      } .bind(this), 500);

    },

    onPreShow: function () {
      this.turning();
    },

    onShow: function () {
      hljs.initHighlightingOnLoad();
    },

    onHide: function () {
      if(this.alert1 && this.alert1.status == 'show')  this.alert1.hide();
      if(this.alert2 && this.alert2.status == 'show') this.alert2.hide();
      if(this.alert3 && this.alert3.status == 'show') this.alert3.hide();
      if(this.alert4 && this.alert4.status == 'show') this.alert4.hide();
      if(this.alert5 && this.alert5.status == 'show') this.alert5.hide();
    }

  });
});
