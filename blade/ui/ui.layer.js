
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

      this.mask.resetDefaultProperty();

      this.needMask = true;

      this.needAnimat = true;

      //需要点击蒙版删除
      this.maskToHide = true;

      //需要居中定位
      this.needReposition = true;

      //是否具有后退关闭弹出层需求
      this.hasPushState = (history && history.pushState);
      this.hasPushState = false;

      //是否为浏览器回退
      this.historyBack = false;

      this.animateInClass = 'cm-up-in';
      this.animateOutClass = 'cm-up-out';

      this.animateShowAction = null;
      this.animateHideAction = null;

      //调整事件绑定位置
      this.events = {
        'touchmove': '_preventDefault'
      };

    },

    initialize: function ($super, opts) {
      $super(opts);

      this.clearRes();
    },

    resetPropery: function () {
      var scope = this;
      if (this.needAnimat) {
        if (!this.animateShowAction)
          this.animateShowAction = function (el) {
            el.show();
            el.addClass(scope.animateInClass);
            //防止class不存在的情况下导致动画不执行，而程序出错
            el.one($.fx.animationEnd, function () {
              el.removeClass(scope.animateInClass);
            });
          };

        if (!this.animateHideAction)
          this.animateHideAction = function (el) {
            el.addClass(scope.animateOutClass);
            el.one($.fx.animationEnd, function () {
              el.removeClass(scope.animateOutClass);
              el.hide();
            });

          };
      }

      //如果存在关闭动画接口，需要为mask加动画
      if (this.animateHideAction) {
        this.mask.needAnimat = true;
        this.mask.animateHideAction = function (el) {
          el.addClass(scope.mask.animateOutClass);
          el.one($.fx.animationEnd, function () {
            el.removeClass(scope.mask.animateOutClass);
            el.hide();
          });
        };
      } else {
        this.mask.animateHideAction = null;
      }
      this._setMaskEvent();
    },

    _setMaskEvent: function () {
      var scope = this;
      //这里处理是否点击关闭蒙版的操作
      if (this.needMask && this.maskToHide) {
        //mask显示之前为mask绑定关闭事件，一次执行便不予理睬了
        this.mask.addEvents({
          'click': function () {
            scope.hide();
          }
        });
      }
    },

    //资源清理
    clearRes: function () {
      //      if (this.needMask == false) this.mask = null;
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
        if (this.needMask) this.mask.show();

      });

      this.on('onShow', function () {
        this.setzIndexTop();
        this._addPushStateEvent();
        if (this.needReposition) this.reposition();

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
        this.mask.hide();
        this._removePushStateEvent();

      });

      this.on('onDestroy', function () {
        this.mask.destroy();
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
