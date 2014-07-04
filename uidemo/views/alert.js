define(['View', getViewTemplatePath('alert'), 'UIAlert'], function (View, viewhtml, UIAlert) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);

    },

    events: {
      'click .demo1': function () {

      },

      'click .demo1': function () {
        if (!this.alert1) {
          this.alert1 = new UIAlert({
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
        this.alert1.show();
      },
      'click .demo2': function () {
        if (!this.alert2) {
          this.alert2 = new UIAlert({
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
        this.alert2.show();

      }

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
