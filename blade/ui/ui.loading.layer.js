
/*
用于继承的类，会自动垂直居中

*/
define(['UILayer', getAppUITemplatePath('ui.loading.layer')], function (UILayer, template) {


  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;
      this.datamodel = {
        closeBtn: false,
        text: ''
      };

      this.events = {
        'click .cui-grayload-close': 'closeAction'
      };

      this.maskToHide = false;
      this.hasPushState = false;

    },

    initElement: function () {
      this.el = this.$('.cui-grayload-text');
    },

    reposition: function () {
      this.el.css({
        'margin-left': -(this.el.width() / 2) + 'px',
        'margin-top': -(this.el.height() / 2) + 'px'
      });
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
      var isChange = false;
      if (text) {
        this.datamodel.text = text;
        isChange = true; 
      } else {
        this.datamodel.text = '';
      }
      if (fn) {
        this.closeAction = fn; isChange = true;
        this.datamodel.closeBtn = true;
      } else {
        this.datamodel.closeBtn = false;
      }
      if (isChange) this.refresh();
    }

  });


});
