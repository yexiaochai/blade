
/*
用于继承的类，会自动垂直居中

*/
define(['UILayer', getAppUITemplatePath('ui.toast')], function (UILayer, template) {


  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      this.template = template;
      this.datamodel = {
        text: 'toast'
      };
      this.hideSec = 2000;
      this.TIMERRES = null;
    },

    hideAction: function () {
      console.log('hide')
    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    addEvent: function ($super) {
      $super();
      this.on('onCreate', function () {
        this.$el.addClass('cui-toast');
      });

      this.on('onShow', function () {
        //显示指定时间后需要关闭
        if (this.TIMERRES) clearTimeout(this.TIMERRES);
        this.TIMERRES = setTimeout($.proxy(function () {
          this.hide();
        }, this), this.hideSec);
      });

      this.on('onHide', function () {
        //显示指定时间后需要关闭
        if (this.TIMERRES) clearTimeout(this.TIMERRES);
        this.hideAction();
      });
    },

    setDatamodel: function (text, fn) {
      this.datamodel.text = text;
      this.hideAction = fn;
      this.refresh();
    }


  });


});
