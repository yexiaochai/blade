
/*
用于继承的类，会自动垂直居中

*/
define(['UIView', 'UIMask'], function (UIView, UIMask) {

  return _.inherit(UIView, {

    //默认属性
    propertys: function ($super) {
      $super();
      this.mask = new UIMask();
      //类型为layer
      this.type = 'layer';

      this.resetDefaultProperty();

    },

    resetDefaultProperty: function () {
      //需要蒙版
      this.needMask = true;

      //需要点击蒙版删除
      this.maskToHide = true;

      //需要居中定位
      this.needReposition = true;

      //是否具有后退关闭弹出层需求
      this.hasPushState = (history && history.pushState);
      this.hasPushState = false;

      //是否为浏览器回退
      this.historyBack = false;

    
      this.animateShowAction = null;
      this.animateHideAction = null;
    },

    initialize: function ($super, opts) {
      $super(opts);

      this.clearRes();
    },



    //资源清理
    clearRes: function () {
      //      if (this.needMask == false) this.mask = null;
    },

    _addTouchEvent: function () {
      var scope = this;
      this._removeTouchEvent();

      var _handler = function (e) {
        e.preventDefault();
      };

      this.$el.on('touchmove.layertouchmove' + this.id, _handler);
      this.$el.on('mousemove.layertouchmove' + this.id, _handler);

    },

    _removeTouchEvent: function () {
      this.$el.off('.layertouchmove' + this.id);
    },

    _addPushStateEvent: function () {
      if (!this.hasPushState) return;
      history.pushState({}, document.title, location.href);
      this.historyBack = false;
      $(window).on('popstate.pageviewpopstate' + this.id, $.proxy(function (e) {
        this.historyBack = true;
        this.hide();
      }, this));
    },

    _removePushStateEvent: function () {
      if (!this.hasPushState) return;
      $(window).off('.pageviewpopstate' + this.id);
    },

    addEvent: function () {
      this.on('onCreate', function () {
        this.$el.addClass('cui-layer');
      });

      this.on('onPreShow', function () {
        var scope = this;

        if (this.needMask) {
          this.mask.show();
        }

        if (this.needMask && this.maskToHide) {
          //mask显示之前为mask绑定关闭事件，一次执行便不予理睬了
          this.mask.$el.on('click.uimask' + this.mask.id, function () {
            scope.hide();
          });
        }

      });

      this.on('onShow', function () {
        if (this.needReposition) this.reposition();
        this.setzIndexTop();
        this._addTouchEvent();
        this._addPushStateEvent();

      });

      this.on('onPreHide', function () {
        //执行两次hide方法
        if (this.hasPushState && !this.historyBack) {
          history.back();
          return;
        }

      });

      this.on('onHide', function () {
        if (this.hasPushState && !this.historyBack) {
          return;
        }
        this.mask.$el.off('.uimask' + this.mask.id);
        this.mask.hide();
        this._removeTouchEvent();
        this._removePushStateEvent();

      });

    },

    //弹出层类垂直居中使用
    reposition: function () {
      this.$el.css({
        'margin-left': -(this.$el.width() / 2) + 'px',
        'margin-top': -(this.$el.height() / 2) + 'px'
      });
    }

  });

});
