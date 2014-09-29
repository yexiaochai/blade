
/*
用于继承的类，会自动垂直居中

*/
define(['UILayer', getAppUITemplatePath('ui.toast')], function (UILayer, template) {


  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
    },

    resetDefaultProperty: function ($super) {
      $super();
      this.template = template;
      this.datamodel = {
        content: 'toast'
      };
      this.hideSec = 2000;
      this.hasPushState = false;
      this.TIMERRES = null;

      this.hideAction = function () {
        console.log('hide')
      };

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

    /**
    * 显示Toast
    * @param title 标题
    * @param timeout 显示时长
    * @param callback 隐藏时回调
    * @param clickToHide 是否允许点击界面任一处,隐藏Toast
    */
    setDatamodel: function (content, timeout, hideAction, clickToHide) {
      this.datamodel.content = content;
      timeout && (this.hideSec = timeout);
      hideAction && (this.hideAction = hideAction);
      this.maskToHide = clickToHide;

      this.refresh();
    }


  });


});
