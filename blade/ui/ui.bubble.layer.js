
define(['UILayer', getAppUITemplatePath('ui.bubble.layer')], function (UILayer, template) {


  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;
      this.needMask = false;

      this.datamodel = {
        data: [
          { name: '价格/星级' },
          { name: '位置区域' },
          { name: '品牌' },
          { name: '入住有效期' }
        ]
      };

    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    addEvent: function ($super) {
      $super();
      this.on('onCreate', function () {
        this.$el.addClass('cui-f-layer');
      });

    }

  });


});
