define(['View', getViewTemplatePath('toast'), 'UIToast'], function (View, viewhtml, UIToast) {

  return _.inherit(View, {
    propertys: function ($super) {
      $super();
      this.template = viewhtml;

      this.addEvents({
        'click .js_demo04': 'demo04'
      });

    },

    demo04: function () {
      if (!this.toast01) {
        this.toast01 = new UIToast({
          datamodel: {
            content: 'two second close'
          },
          needAnimat: false,
          hideSec: 2000
        });
      }
      this.toast01.show();
    }


  });

});
