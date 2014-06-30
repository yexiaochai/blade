
/*
用于继承的类，会自动垂直居中

*/
define(['UILayer', getAppUITemplatePath('ui.alert')], function (UILayer, template) {


  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();

      //数据模型
      this.datamodel = {
        title: 'alert',
        content: 'content',
        btns: [
          { name: 'cancel', className: 'cui-btns-cancel' },
          { name: 'ok', className: 'cui-btns-ok' }
        ]
      };

      //html模板
      this.template = template;

      //事件机制
      this.events = {
        'click .cui-btns-ok': 'okAction',
        'click .cui-btns-cancel': 'cancelAction'
      };
    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    addEvent: function ($super) {
      $super();
      this.on('onCreate', function () {
        this.$el.addClass('cui-alert');
      });
      this.maskToHide = false;
    },

    okAction: function () {
      this.hide();
      console.log('ok');
    },

    cancelAction: function () {
      this.hide();
      console.log('cancel');

    },

    setDatamodel: function (datamodel, okAction, cancelAction) {
      _.extend(this.datamodel, datamodel);
      this.okAction = okAction;
      this.cancelAction = cancelAction;
      this.refresh();
      
    }


  });


});
