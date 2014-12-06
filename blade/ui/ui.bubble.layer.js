
define(['UILayer', getAppUITemplatePath('ui.bubble.layer')], function (UILayer, template) {
  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;
      this.needMask = true;

      this.needReposition = true;
      this.animateInClass = 'cm-fade-in';
      this.animateOutClass = 'cm-fade-out';

      this.datamodel = {
        scope: this,
        data: [],
        upClass: 'cm-pop--triangle-up',
        downClass: 'cm-pop--triangle-down',
        wrapperClass: 'cm-pop--border',
        curClass: 'active',
        itemStyleClass: '',
        needBorder: true,
        index: -1,
        dir: 'up'  //箭头方向默认值
      };

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

    initialize: function ($super, opts) {
      $super(opts);
    },

    createRoot: function (html) {
      this.$el = $(html).hide().attr('id', this.id);
    },

    clickAction: function (e) {
      var el = $(e.currentTarget);
      var i = el.attr('data-index');
      var data = this.datamodel.data[i];
      this.onClick.call(this, data, i, el, e);
    },

    initElement: function () {
      this.el = this.$el;
      this.triangleEl = this.$('.icon-pop-triangle');
      this.windowWidth = $(window).width();
    },

    setIndex: function (i) {
      var curClass = this.datamodel.curClass;
      i = parseInt(i);
      if (i < 0 || i > this.datamodel.data.length || i == this.datamodel.index) return;
      this.datamodel.index = i;

      //这里不以datamodel改变引起整个dom变化了，不划算
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
      if (this.datamodel.dir == 'up') {
        top = (offset.top + offset.height + 8) + 'px';
      } else {
        top = (offset.top - this.el.offset().height - 8) + 'px';
      }

      left = (offset.left + 2) + 'px';


      if (offset.left + (parseInt(this.width) || w) > this.windowWidth) {
        this.el.css({
          width: this.width || w,
          top: top,
          right: '2px'
        });
      } else {
        this.el.css({
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
        this.$el.removeClass('cui-layer');
        this.mask.$el.addClass('cm-overlay--transparent');
        this.mask.$el.removeClass('cui-mask');

        this.$el.css({ position: 'absolute' });
      });
      this.on('onShow', function () {
        this.setzIndexTop(this.el);

      });
    }

  });

});
