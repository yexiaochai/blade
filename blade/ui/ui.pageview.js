
//define(['UIView', getAppUITemplatePath('ui.pageview'), 'cWidgetFactory', 'cWidgetGuider'], function (UIView, template, WidgetFactory) {

define(['UIView', getAppUITemplatePath('ui.pageview')], function (UIView, template) {

  return _.inherit(UIView, {

    //默认属性
    propertys: function ($super) {
      $super();
      this.template = template;

      this.noTouchMove = false;

      //类型为layer
      this.type = 'pageview';

      this.animateSwitch = false;      //right, left, top, bottom, none

      //使用的内嵌实例
      this.inlineInstance = null;

      //是否具有后退关闭弹出层需求
      this.hasPushState = (history && history.pushState);
      //是否为浏览器回退
      this.historyBack = false;


      this.showAction = function () { };
      this.hideAction = function () { };

    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    initElement: function () {
      this.pageViewContent = this.$('article');
    },

    //重新父类创建根节点方法
    createRoot: function (html) {
      this.$el = $(html).hide().attr('id', this.id);
    },

    _addTouchEvent: function () {
      if (!this.noTouchMove) return;
      this.$el.on('touchmove.pageviewtouchmove' + this.id, function (e) {
        e.preventDefault();
      });
    },

    _removeTouchEvent: function () {
      if (!this.noTouchMove) return;
      this.$el.off('.pageviewtouchmove' + this.id);
    },

    _addPushStateEvent: function () {
      if (!this.hasPushState) return;
      history.pushState({}, document.title, location.href);
      this.historyBack = false;
      $(window).on('popstate.pageviewpopstate' + this.id, $.proxy(function (e) {
        this.historyBack = true;
        this.animateHide();
      }, this));
    },

    _removePushStateEvent: function () {
      if (!this.hasPushState) return;
      $(window).off('.pageviewpopstate' + this.id);
    },

    //处理动画方向
    animateHandler: function () {
      var prepareCss;
      if (this.animateSwitch) {
        switch (this.animateSwitch) {
          case 'top':
            prepareCss = 'translate(0, 100%)';
            break;
          case 'bottom':
            prepareCss = 'translate(0, -100%)';
            break;
          case 'left':
            prepareCss = 'translate(-100%, 0)';
            break;
          case 'right':
            prepareCss = 'translate(100%, 0)';
            break;
          default:
            prepareCss = 'translate(100%, 0)';
        }
      }
      return prepareCss;
    },

    animateShow: function (inlineInstance) {

      if (inlineInstance) {
        //如果该pageview已经被使用，则需要消耗内嵌实例，再重新赋值
        if (this.inlineInstance && this.inlineInstance != inlineInstance) this.inlineInstance.destroy();
        this.inlineInstance = inlineInstance;
      } else {
        if (this.inlineInstance) {
          this.inlineInstance.destroy();
          this.inlineInstance = null;
        }
        $('.main-frame, .main').hide();
        this.show();
        return;
      }

      if (!this.animateSwitch) {
        $('.main-frame, .main').hide();
        this.show();
        return;
      }

      this.show(function (el) {
        var prepareCss = this.animateHandler();
        el.css({
          '-webkit-transform': prepareCss,
          transform: prepareCss
        });
        el.show();
        el.animate({
          '-webkit-transform': 'translate(0, 0)',
          transform: 'translate(0, 0)'
        }, 400, 'ease-in-out', function () {
          setTimeout(function () {
            $('.main-frame, .main').hide();
          }, 20);
          el.css({
            '-webkit-transform': '',
            transform: ''
          });
        });
      });
    },

    animateHide: function () {
      if (!this.animateSwitch) {
        $('.main-frame, .main').show();
        this.hide();
        return;
      }

      this.hide(function (el) {
        var prepareCss = this.animateHandler();
        el.animate({
          '-webkit-transform': prepareCss,
          transform: prepareCss
        }, 400, 'ease-in-out', function () {
          el.hide();
          el.css({
            '-webkit-transform': '',
            transform: ''
          });
        });
      });
    },

    showInlineInstance: function () {
      if (!this.inlineInstance) return;
      this.inlineInstance.wrapper = this.pageViewContent;
      this.inlineInstance.show();
    },

    hideInlineInstance: function () {
      if (!this.inlineInstance) return;
      this.inlineInstance.hide();
    },

    //这是尺寸
    _setSize: function () {
      this.$el.css({
        'min-width': Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) + 'px',
        'min-height': Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) + 'px'
      });
    },

    _reSize: function () {
      this.$el.css({
        'min-width': $(window).width() + 'px',
        'min-height': $(window).height() + 'px'
      });
    },

    addAction: function (showAction, hideAction) {
      if (!showAction)
        this.showAction = function () { };
      else
        this.showAction = showAction;

      if (!hideAction)
        this.hideAction = function () { };
      else
        this.hideAction = hideAction;
    },

    removeAction: function () {
      this.showAction = function () { };
      this.hideAction = function () { };
    },

    addEvent: function () {

      this.on('onPreShow', function () {
        this._setSize();
      });

      this.on('onShow', function () {
        var self = this;
        self.$el.css('top', '48px');

        //处理头部问题
        //        Guider.apply({
        //          hybridCallback: function () {
        //          },
        //          callback: function () {
        //            self.$el.css('top', '48px');
        //          }
        //        });

        this.showAction.call(this);

        this.setzIndexTop();
        this._addTouchEvent();
        this._addPushStateEvent();

        this.showInlineInstance();
        this._reSize();

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

        this.hideAction.call(this);

        this._removeTouchEvent();
        this._removePushStateEvent();

        //这里代码需要优化
        setTimeout($.proxy(function () {
          this.hideInlineInstance();
        }, this), 400);

        $('.main-frame, .main').show();
        this.removeAction();
      });

    }

  });

});
