define(['View', getViewTemplatePath('alert'), 'UIAlert'], function (View, viewhtml, UIAlert) {

  return _.inherit(View, {
    propertys: function ($super) {
      $super();
      this.template = viewhtml;

      this.addEvents({
        'click .js_demo06': 'demo06'
      });
    },

    demo06: function () {
      if (!this.alert01) {
        this.alert01 = new UIAlert({
          datamodel: {
            content: '单独使用时，注意onHide时候释放资源，按钮样式需要自己定制',
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

      this.alert01.show();
    }


  });

});
