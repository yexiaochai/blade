define(['View', 'UIAlert', getViewTemplatePath('alert')], function (View, UIAlert, viewhtml) {

  return _.inherit(View, {
    onCreate: function () {
      console.log('onCreate');
      this.$el.html(viewhtml);
    },

    events: {
      //简单应用
      'click .widget0': function (e) {
        var uiAlert = new UIAlert();
        uiAlert.show();
      },

      //实例化重组
      'click .widget1': function (e) {
        var uiAlert = new UIAlert({
          datamodel: { title: '重组', content: '实例化重组' },
          template:
              '<div class="cui-pop-box">' +
                '<div class="cui-hd">' +
                  '<%=title%>' +
                '</div>' +
                '<div class="cui-bd">' +
                  '<div class="cui-error-tips">' +
                  '<%=content%>' +
                  '</div>' +
                  '<div class="cui-roller-btns">' +
                    '<div class="cui-flexbd cui-btns-ok">' +
                    'ok' +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</div>'
        });
        uiAlert.show();
      },

      //动态变化
      'click .widget2': function (e) {
        var uiAlert = new UIAlert();
        uiAlert.show();

        setTimeout(function () {
          uiAlert.setDatamodel({
                title: '动态变化',
                content: '0.5秒后变化'
              },
              function () {
                alert('okAction重组');
                this.hide();
              }, function () {
                alert('cancelAction重组');
                this.hide();
              }
          );
        }, 500)
      },

      //一个按钮
      'click .widget3': function (e) {
        var uiAlert = new UIAlert({
          datamodel: {
            title: '一个按钮',
            content: '一个按钮',
            btns: [
              {
                name: 'ok',
                className: 'cui-btns-ok'
              }
            ]
          },
          events: {
            'click .cui-btns-ok': 'okAction'
          },
          'okAction': function () {
            alert('单重写okAction');
            this.hide();
          }
        });
        uiAlert.show();
      },

      'click .back': function () {
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
