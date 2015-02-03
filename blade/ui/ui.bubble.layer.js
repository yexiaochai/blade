
define(['UILayer', 'text!T_UIBubbleLayer', 'text!C_UIBubbleLayer'], function (UILayer, template, style) {

  'use strict';

  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;
      //只继承基类的重置css
      this.uiStyle[1] = style;

      this.setUIType('bubbleLayer');

      this.needMask = true;

      this.needReposition = true;
      this.animateInClass = 'cm-up-in';
      this.animateOutClass = 'cm-up-out';

      //默认数据源
      this.scope = this;
      this.data = [];
      this.upClass = 'cm-pop--triangle-up';
      this.downClass = 'cm-pop--triangle-down';
      this.wrapperClass = 'cm-pop--border';
      this.curClass = 'active';
      this.itemStyleClass = '';
      this.needBorder = true;
      this.index = -1;
      //箭头方向默认值
      this.dir = 'up';

      this.addEvents({
        'click .cm-pop-list>li': 'clickAction'
      });

      this.onClick = function (data, index, el, e) {
        console.log(arguments);
        this.setIndex(index);
        var e = '';
      };

      this.width = null;

      //三角图标偏移量
      this.triangleLeft = null;
      this.triangleRight = null;

      //由于该组件的triggerEL处于头部每次都会重新渲染，这里保存的仅仅是一个映射，而且是无效的映射，所以这里需要重建映射关系
      //这里由于event参数已经过期，所以这层映射关系建立不起来咯，所以这里还是保存位置信息
      this.triggerEl = null;
      this.needAnimat = true;

    },

    getViewModel: function () {
      return this._getDefaultViewModel(['scope', 'data', 'upClass', 'downClass', 'wrapperClass', 'curClass', 'itemStyleClass', 'needBorder', 'index', 'dir']);
    },

    clickAction: function (e) {
      var el = $(e.currentTarget);
      var i = el.attr('data-index');
      var data = this.data[i];
      this.onClick.call(this, data, i, el, e);
    },

    initElement: function () {
      this.el = this.$root;
      this.triangleEl = this.$('.icon-pop-triangle');
      this.windowWidth = $(window).width();
    },

    setIndex: function (i) {
      var curClass = this.curClass;
      i = parseInt(i);
      if (i < 0 || i > this.data.length || i == this.index) return;
      this.index = i;

      //这里不以改变引起整个dom变化了，不划算
      this.$('.cm-pop-list li').removeClass(curClass);
      this.$('li[data-index="' + i + '"]').addClass(curClass);
    },

    //位置定位
    //此处如果设置width如果导致换行将引起定位出问题
    reposition: function () {
      if (!this.triggerEl) return;
      if (this.width) {
        this.el.css('width', this.width);
      }
      var offset = this.triggerEl.offset();

      //这里保留位置信息，防止triggerEl的映射丢失
      if (!this.triggerEl.offset)
        this.triggerEl.offset = offset;
      if (offset.width === 0 && this.triggerEl.offset) {
        offset = this.triggerEl.offset;
      }

      var step = 6, w = offset.width - step;
      var top = 0, left = 0, right;
      if (this.dir == 'up') {
        top = (offset.top + offset.height + 8) + 'px';
      } else {
        top = (offset.top - this.el.offset().height - 8) + 'px';
      }

      left = (offset.left + 2) + 'px';


      if (offset.left + (parseInt(this.width) || w) > this.windowWidth) {
        this.el.css({
          'position': 'absolute',
          width: this.width || w,
          top: top,
          right: '2px'
        });
      } else {
        this.el.css({
          'position': 'absolute',
          width: this.width || w,
          top: top,
          left: left
        });
      }

      if (this.triangleLeft) {
        this.triangleEl.css({ 'left': this.triangleLeft, 'right': 'auto' });
      }
      if (this.triangleRight) {
        this.triangleEl.css({ 'right': this.triangleRight, 'left': 'auto' });
      }

    },

    addEvent: function ($super) {
      $super();
      this.on('onCreate', function () {
        this.mask.$el.addClass('cm-overlay--transparent');
        this.mask.$el.removeClass('cui-mask');
      });
      this.on('onShow', function () {
        this.setzIndexTop(this.el);

      });
    }

  });

});
