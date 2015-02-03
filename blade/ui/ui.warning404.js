define(['UIView', 'text!T_UIWaring404', 'text!C_warning404'], function (UIView, template, style) {

  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();
      this.resetDefaultProperty();

    },

    resetDefaultProperty: function () {
      //html模板
      this.template = template;

      this.addUIStyle(style);
      this.openShadowDom = false;

      this.tel = '4000086666';
      this.loadFail = '加载失败，请稍后再试试吧';
      this.telText = '或者拨打携程客服电话';
      this.tryAgain = '重试';
      this.contact = '联系客服';
      this.showContact = true;

      this.events = {
        'click .js_contact': 'callTelAction',
        'click .js_retry_btn': 'retryAction'
      };

      this.retryAction = function (e) {
        console.log('override retryAction');
      };

      this.callTelAction = function (e) {
        window.location.href = 'tel:' + self.tel
      };
    },

    getViewModel: function () {
      return this._getDefaultViewModel(['tel', 'loadFail', 'telText', 'tryAgain', 'contact', 'showContact']);
    }

  });

});
