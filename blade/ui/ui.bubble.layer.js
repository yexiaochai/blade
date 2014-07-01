
define(['UILayer', getAppUITemplatePath('ui.bubble.layer')], function (UILayer, template) {


  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;
      this.needMask = false;
      //      this.needReposition = false;

      this.datamodel = {
        data: [
          { name: '价格/星级' },
          { name: '位置区域' },
          { name: '品牌' },
          { name: '<span>测试</span>' }
        ],
        upClass: 'f-layer-before',
        downClass: 'f-layer-after',
        curClass: 'cui-fl-current',
        index: 2,
        dir: 'up'  //箭头方向默认值
      };

      this.events = {
        'click .cui-f-layer>li': 'clickAction'
      };

      this.onClick = function (e, data, index, el) {
        console.log(arguments);
        this.setIndex(index);
        var e = '';
      };

      this.triggerEl = null;

    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    clickAction: function (e) {
      var el = $(e.currentTarget);
      var i = el.attr('data-index');
      var data = this.datamodel.data[i];
      this.onClick.call(this, e, data, i, el);
    },

    initElement: function () {
      this.el = this.$('ul.cui-f-layer');
    },

    setIndex: function (i) {
      var curClass = this.datamodel.curClass;
      i = parseInt(i);
      if (i < 0 || i > this.datamodel.data.length || i == this.datamodel.index) return;
      this.datamodel.index = i;

      //这里不以datamodel改变引起整个dom变化了，不划算
      this.$('.cui-f-layer li').removeClass(curClass);
      this.$('li[data-index="' + i + '"]').addClass(curClass);
    },

    //位置定位
    reposition: function () {
      if (!this.triggerEl) return;
      var offset = this.triggerEl.offset();
      var step = 6, w = offset.width - step;
      var top = 0, left = 0;
      if (this.datamodel.dir == 'up') {
        top = (offset.top + offset.height + 8) + 'px';
        left = (offset.left + 2) + 'px';
      } else {
        top = (offset.top - this.el.offset().height - 8) + 'px';
        left = (offset.left + 2) + 'px';
      }

      this.el.css({
        width: w,
        top: top,
        left: left
      });

    },

    addEvent: function ($super) {
      $super();

      this.on('onCreate', function () {
        this.$el.removeClass('cui-layer');
      });

      this.on('onShow', function () {
        this.setzIndexTop(this.el);
      
      });
    }

  });


});
