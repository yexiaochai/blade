/*


*/
define(['UILayer', 'text!T_UIToast'], function (UILayer, template) {

  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
    },

    resetDefaultProperty: function ($super) {
      $super();
      this.template = template;

      this.content = 'toast';
      this.hideSec = 2000;
      this.hasPushState = false;
      this.TIMERRES = null;

      this.hideAction = function () {
      };

    },

    getViewModel: function () {
      return this._getDefaultViewModel(['content', 'btns']);
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
    }

  });


});
