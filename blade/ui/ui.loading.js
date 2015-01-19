
/*
用于继承的类，会自动垂直居中

*/
define(['UILayer', getAppUITemplatePath('ui.loading')], function (UILayer, template) {


  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;
      this.maskToHide = false;

      this.hasPushState = false;

      //重写Type定义
      this.type = "loading";
    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    addEvent: function ($super) {
      $super();
      this.on('onCreate', function () {
        this.$el.addClass('cui-loading');
      });

    }

  });


});
