define(['View', 'UIAlert', getViewTemplatePath('alert')], function (View, UIAlert, viewhtml) {

  return _.inherit(View, {
    onCreate: function () {
      console.log('onCreate');
      this.$el.html(viewhtml);
    },

    events: {
      'click .widget0': function (e) {
        var uiAlert = new UIAlert();
        uiAlert.show();
      },

      'click .widget1': function (e) {
        var uiAlert = new UIAlert({
          datamodel: { title: '11', content: '22' },
          template: '<div><%=title%>-<%=content%></div>'
        });
        uiAlert.show();
      },

      'click .widget2': function (e) {
        var uiAlert = new UIAlert();
        uiAlert.show();

        var uiAlert1 = new UIAlert();
        uiAlert1.show();

        setTimeout(function () {
          uiAlert.setDatamodel({
            title: '事实上'
          },
          function () {
            alert(1)
          }, function () {
            alert(2)
          }
          );
        }, 1000)

      },

      'click .widget3': function (e) {
        var uiAlert = new UIAlert({
          datamodel: { 
            title: '11', 
            content: '22',
            btns: [ { 
                name: 'ok', 
                className: 'cui-btns-ok' 
              }
            ]
          },
          events: {
              'click .cui-btns-ok': 'okAction'
          },
          'okAction': function () {
            alert('111')
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
