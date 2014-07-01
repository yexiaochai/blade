define(['UILayer', getAppUITemplatePath('ui.scroll.layer')], function (UILayer, template) {


  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;

   

    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    addEvent: function ($super) {
      $super();
      //      this.on('onCreate', function () {
      //        this.$el.addClass('cui-loading');
      //      });

    }

  });


});
