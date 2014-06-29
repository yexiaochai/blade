
/*
用于继承的类，会自动垂直居中

*/
define(['UILayer', getAppUITemplatePath('ui.reloading')], function (UILayer, template) {


  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;
      this.datamodel = {
        text: '文字信息'
      };

      this.events = {
        'click .cui-grayload-close': 'closeAction'
      };

      this.maskToHide = false;

    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    addEvent: function ($super) {
      $super();
      this.on('onCreate', function () {
        this.$el.addClass('cui-loading');
      });
    },

    closeAction: function (e) {
      this.hide();
    },

    setDatamodel: function (text, fn) {
      this.datamodel.text = text;
      this.closeAction = fn;
      this.refresh();
    }

  });


});
