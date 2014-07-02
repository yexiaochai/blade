define(['UIView', getAppUITemplatePath('ui.select'), 'UIScroll'], function (UIView, template, UIScroll) {


  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;

      var data1 = [];

      for (var i = 0; i < 10; i++) {
        data1.push({ id: 'q_' + i, name: '项目_' + i });
      }

      this.datamodel = {
        curClass: 'current',
        data: data1,
        index: 4
      };

      this.itemNum = this.datamodel.data.length;

      //这里便只有一个接口了
      this.displayNum = 5;

      //选择时候的偏移量
      this.scrollOffset = 0;

      //滚动对象
      this.scroll = [];

      this.changed = function (item) {
        console.log(item);
      };

    },

    resetDisplayNum: function () {
      this.displayNum = this.displayNum % 2 == 0 ? this.displayNum + 1 : this.displayNum;
    },

    initElement: function () {

      //几个容器的高度必须统一
      this.swrapper = this.$('.cui-roller-bd');
      this.scroller = this.$('.ul-list');
      this.resetDisplayNum();

    },

    initSize: function () {
      this.sheight = this.scroller.height();
      this.itemHeight = parseInt(this.sheight / this.itemNum);
      this.swrapper.height(this.itemHeight * this.displayNum);
      this.scrollOffset = ((this.displayNum - 1) / 2) * (this.itemHeight);
    },

    //修正位置信息
    adjustPosition: function () {
      if (!this.scroll) return;
      var index = this.datamodel.index, _top;
      _top = (this.itemHeight * index) * (-1) + this.scrollOffset;

      this.scroll.scrollTo(0, _top);
    },

    _initScroll: function () {
      this.scroll = new UIScroll({
        scrollbars: false,
        scrollOffset: this.scrollOffset,
        step: this.itemHeight,
        wrapper: this.swrapper,
        scroller: this.scroller

      });

      //每次拖动结束需要记录当前选项并且触发事件
      this.scroll.on('animatEnd', $.proxy(function () {
        //        this.datamodel.index = this.getIndexByPosition();
        this.setIndex(this.getIndexByPosition(), true)
      }, this));

    },


    //这里要处理不可选的状况
    setIndex: function (i, noPosition) {
      if (typeof noPosition == 'undefined' && i == this.datamodel.index) noPosition = true;
      var isChange = this.datamodel.index != i;

      i = parseInt(i);
      if (i < 0 || i >= this.itemNum) return;
      this.datamodel.index = i;

      this.resetCss();
      if (!noPosition) this.adjustPosition();
      if (isChange) this.changed && this.changed.call(this, this.getSelected());
    },

    resetCss: function () {
      this.$('li').removeClass('current');
      this.$('li[data-index="' + this.datamodel.index + '"]').addClass('current');

    },

    getIndex: function () {
      return this.datamodel.index;
    },

    setId: function (id) {
      if (!id) return;
      var index = -1, i, len;
      for (i = 0, len = this.datamodel.data.length; i < len; i++) {
        if (this.datamodel.data[i].id == id) { index = i; break; }
      }
      if (index == -1) return;
      this.datamodel.index = index;
      this.setIndex(index);

    },

    getId: function () {
      return this.getSelected().id;
    },

    getSelected: function () {
      return this.datamodel.data[this.datamodel.index];
    },

    //根据位置信息重新设置当前选项
    getIndexByPosition: function () {
      var pos = this.scroll.y - this.scrollOffset;
      var index = Math.abs(pos) / this.itemHeight;
      return index;
    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    addEvent: function ($super) {
      $super();


      //这个要在第一位，因为后面会执行父类的position方法居中，尺寸没有就不行
      this.on('onShow', function () {
        this.initSize();
        this._initScroll();
        this.adjustPosition();
        this.resetCss();
      }, 1);

      this.on('onHide', function () {

      });
    }

  });


});
