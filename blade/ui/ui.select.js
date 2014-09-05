define(['UIView', getAppUITemplatePath('ui.select'), 'UIScroll'], function (UIView, template, UIScroll) {
  /*
  该组件使用时，其父容器一定是显示状态，如果不是显示状态，高度计算会失效
  */

  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;

      this.datamodel = {
        curClass: 'current',
        data: [],
        id: null,
        index: 0
      };

      this.animatTime = 100;

      this.stepTime = 150;

      this.itemNum = this.datamodel.data.length;

      //这里便只有一个接口了
      this.displayNum = 5;

      //选择时候的偏移量
      this.scrollOffset = 0;

      //滚动对象
      this.scroll = null;

      this.changed = function (item) {
        console.log(item);
      };

    },

    //要求唯一标识，根据id确定index
    resetPropery: function () {
      this._resetNum();
      this._resetIndex();
    },

    _resetIndex: function () {
      if (!this.datamodel.id) return;
      for (var i = 0, len = this.datamodel.data.length; i < len; i++) {
        if (this.datamodel.id == this.datamodel.data[i].id) {
          this.datamodel.index = i;
          break;
        }
      }
    },

    _resetNum: function () {
      this.displayNum = this.displayNum % 2 == 0 ? this.displayNum + 1 : this.displayNum;
      this.itemNum = this.datamodel.data.length;
    },

    initElement: function () {

      //几个容器的高度必须统一
      this.swrapper = this.$el;
      this.scroller = this.$('.ul-list');
    },

    initSize: function () {
      //      this.sheight = Math.max(this.scroller.height(), this.scroller[0].scrollHeight);
      //      this.sheight =  this.scroller.height() 
      //      this.itemHeight = parseInt(this.sheight / this.itemNum);

      //偶尔不能正确获取高度，这里要处理
      //      if (this.itemHeight == 0) {
      this.itemHeight = parseInt(window.getComputedStyle && getComputedStyle(this.scroller.find('li').eq(0)[0]).height);
      this.scroller.height(this.itemHeight * this.itemNum);
      //      }
      this.swrapper.height(this.itemHeight * this.displayNum);
      this.scrollOffset = ((this.displayNum - 1) / 2) * (this.itemHeight);
    },

    //修正位置信息
    adjustPosition: function (hasAnimate) {
      if (!this.scroll) return;
      var index = this.datamodel.index, _top, time = 0;
      _top = (this.itemHeight * index) * (-1) + this.scrollOffset;
      if (hasAnimate) time = this.animatTime;
      this.scroll.scrollTo(0, _top, time);
    },

    _initScroll: function () {
      if (this.scroll) {
        this.scroll.refresh();
        return;
      }

      this.scroll = new UIScroll({
        scrollbars: false,
        scrollOffset: this.scrollOffset,
        step: this.itemHeight,
        wrapper: this.swrapper,
        bounceTime: 200,
        scroller: this.scroller

      });

      this.scroll.on('scrollEnd', $.proxy(function () {
        this.setIndex(this.getIndexByPosition(), true)
      }, this));

      //为了解决鼠标离屏幕时导致的问题
      this.scroll.on('scrollCancel', $.proxy(function () {
        this.setIndex(this.getIndexByPosition(), false)
      }, this));

    },

    reload: function (datamodel) {
      _.extend(this.datamodel, datamodel);
      if (this.scroll) {
        this.scroll.destroy();
        this.scroll = null;
      }
      this.refresh();
    },

    //检测当前选项是否可选，首次不予关注
    checkDisable: function (dir) {
      dir = dir || 'down'; //默认向下搜索
      var isFind = false, index = this.datamodel.index;
      if (this.datamodel.data[index] && (typeof this.datamodel.data[index].disabled != 'undefined' && this.datamodel.data[index].disabled == true)) {
        //向下的情况
        if (dir == 'up') {
          this.datamodel.index = this._checkSelectedDown(index);
          if (typeof this.datamodel.index != 'number') this.datamodel.index = this._checkSelectedUp(index);
        } else {
          this.datamodel.index = this._checkSelectedUp(index);
          if (typeof this.datamodel.index != 'number') this.datamodel.index = this._checkSelectedDown(index);
        }
      }
      if (typeof this.datamodel.index != 'number') this.datamodel.index = index;

    },

    /**
    * @class _checkSelectedUp
    * @param index {int}    索引
    * @description 向上搜索
    */
    _checkSelectedUp: function (index) {
      var isFind = false;
      for (var i = index; i != -1; i--) {
        if (this.datamodel.data[i] && (typeof this.datamodel.data[i].disabled == 'undefined' || this.datamodel.data[i].disabled == false)) {
          index = i;
          isFind = true;
          break;
        }
      }
      return isFind ? index : null;
    },

    /**
    * @class _checkSelectedDown
    * @param index {int}    索引
    * @description 向下搜索
    */
    _checkSelectedDown: function (index) {
      var isFind = false;
      for (var i = index, len = this.datamodel.data.length; i < len; i++) {
        if (this.datamodel.data[i] && (typeof this.datamodel.data[i].disabled == 'undefined' || this.datamodel.data[i].disabled == false)) {
          index = i;
          isFind = true;
          break;
        }
      }
      return isFind ? index : null
    },

    //这里要处理不可选的状况
    /*
    这段逻辑比较复杂，处理的逻辑较多
    1 每次赋值时候判断是否改变，改变需要触发changed事件
    2 每次赋值还得判断当前选项是否是disabled的，如果是disabled的话还得重置index
    3 以上逻辑会加重changed触发事件以及重新设置index的复杂度

    */
    setIndex: function (i, noPosition, noEvent) {
      if (typeof noPosition == 'undefined' && i == this.datamodel.index) noPosition = true;
      var tmpIndex = i;
      var tmpIndex2;

      //index值是否改变
      var isChange = this.datamodel.index != i;
      var dir = i > this.datamodel.index ? 'up' : 'down';

      i = parseInt(i);
      if (i < 0 || i >= this.itemNum) return;

      tmpIndex2 = this.datamodel.index;

      this.datamodel.index = i;
      this.checkDisable(dir);

      //被改变过了
      if (tmpIndex2 != this.datamodel.index) {
        isChange = true;
      } else {
        isChange = false;
      }

      if (tmpIndex != this.datamodel.index) {
        noPosition = false;
      }

      if (!noPosition) this.adjustPosition(true);
      this.resetCss();
      if (noEvent !== true && isChange) this.changed && this.changed.call(this, this.getSelected());
    },

    resetCss: function () {
      this.$('li').removeClass('current');
      this.$('li[data-index="' + this.datamodel.index + '"]').addClass('current');
    },

    resetIndex: function () {
      this.setIndex(this.datamodel.index, true, true);
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
      this.setIndex(index, false);
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
      return Math.round(index);
    },

    initialize: function ($super, opts) {
      $super(opts);

    },

    addEvent: function ($super) {
      $super();

      this.on('onCreate', function () {
        this.$el.addClass('cui-roller-bd');
        this.$el.addClass('cui-roller');

      });

      //这个要在第一位，因为后面会执行父类的position方法居中，尺寸没有就不行
      this.on('onShow', function () {
        this.initSize();
        this._initScroll();

        this.adjustPosition();
        this.resetCss();
        //防止初始化定义index为不可选index
        this.resetIndex();

      }, 1);

      this.on('onHide', function () {
        if (this.scroll) {
          this.scroll.destroy();
          this.scroll = null;
        }
      });
    }

  });


});
