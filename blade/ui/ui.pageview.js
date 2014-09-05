
/*
用于继承的类，会自动垂直居中

*/
define(['UIView', getAppUITemplatePath('ui.pageview')], function (UIView, template) {

  return _.inherit(UIView, {

    //默认属性
    propertys: function ($super) {
      $super();
      this.template = template;

      this.noTouchMove = false;

      this.datamodel = {
        title: 'title'
      };

      this.events = {
        'click .returnico': 'backAction'
      };

      //类型为layer
      this.type = 'pageview';

      this.animateSwitch = 'top';      //right, left, top, bottom, none

      //使用的内嵌实例
      this.inlineInstance = null;

    },

    backAction: function (e) {
      if (this.animateSwitch) {
        this.animateHide();
      } else {
        this.hide();
      }
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
      $(window).on('popstate.pageviewpopstate' + this.id, $.proxy(function (e) {
        this.hide();
      }, this));
    },

    _removePushStateEvent: function () {
      this.$el.off('.pageviewpopstate' + this.id);
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

      if (inlineInstance && !this.inlineInstance) this.inlineInstance = inlineInstance;

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
          $('.main').hide();

          //            $el.css({
          //              '-webkit-transform': '',
          //              transform: ''
          //            });
        });
      });
    },

    animateHide: function () {
      this.hide(function (el) {
        var prepareCss = this.animateHandler();
        el.animate({
          '-webkit-transform': prepareCss,
          transform: prepareCss
        }, 400, 'ease-in-out', function () {
          el.hide()
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

    addEvent: function () {

      this.on('onPreShow', function () {
        this._setSize();
      });

      this.on('onShow', function () {
        this.setzIndexTop();
        this._addTouchEvent();
        this.showInlineInstance();
        this._reSize();
      });

      this.on('onHide', function () {
        this._removeTouchEvent();
        this.hideInlineInstance();
        $('.main').show();

      });

    }

  });

});
