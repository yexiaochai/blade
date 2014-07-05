define(['UILayer', getAppUITemplatePath('ui.radio.list'), 'UIScroll'], function (UILayer, template, UIScroll) {

  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;

      this.datamodel = {
        title: '标题',
        data: [],
        selectId: null,
        index: 1
      };

      this.itemNum = this.datamodel.data.length;

      this.displayNum = 5;

      this.scroll = null;

      this.events = {
        'click .cui-select-view> li': 'clickAction'
      };

      this.onClick = function (e, data) {
        console.log(data);
      };

    },

    //要求唯一标识，根据id确定index
    resetPropery: function () {
      this._resetNum();
      this._resetIndex();

    },

    _resetIndex: function () {
      if (!this.datamodel.selectId) return;
      for (var i = 0, len = this.datamodel.data.length; i < len; i++) {
        if (this.datamodel.selectId == this.datamodel.data[i].id) {
          this.datamodel.index = i;
          break;
        }
      }
    },

    _resetNum: function () {
      this.displayNum = this.displayNum % 2 == 0 ? this.displayNum + 1 : this.displayNum;
      this.itemNum = this.datamodel.data.length;

    },

    clickAction: function (e) {
      var el = $(e.currentTarget)
      var i = el.attr('data-index');
      this.setIndex(i);
      if (this.onClick) this.onClick.call(this, e, this.getSelected());

    },

    setId: function (id) {
      if (!id) return;
      var index = -1, i, len;
      for (i = 0, len = this.datamodel.data.length; i < len; i++) {
        if (this.datamodel.data[i].id == id) { index = i; break; }
      }
      if (index == -1) return;
      this.datamodel.selectId = id;
      this.datamodel.index = index;
      this.setIndex(index);
    },

    //动态更新数据
    setDatamodel: function (data) {
      _.extend(this.datamodel, data);
      this.itemNum = this.datamodel.data.length;
      this.refresh();
    },

    getId: function () {
      return this.datamodel.selectId;
    },

    setIndex: function (i, position) {
      i = parseInt(i);
      if (i < 0 || i >= this.datamodel.data.length) return;
      this.datamodel.index = i;
      this.datamodel.selectId = this.datamodel.data[i].id;

      //这里不以datamodel改变引起整个dom变化了，不划算
      this.$('li').removeClass('current');
      this.$('li[data-index="' + i + '"]').addClass('current');
      if (position) this._position();
    },

    getIndex: function () {
      return this.datamodel.index;
    },

    getSelected: function () {
      return this.datamodel.data[this.datamodel.index];
    },

    initElement: function () {
      this.swrapper = this.$('.cui-bd');
      this.scroller = this.$('.cui-select-view');

    },

    initSize: function () {
      var num = this.displayNum
      this.sheight = this.scroller.height();
      this.itemHeight = parseInt(this.sheight / this.itemNum);
      if (num > this.itemNum) num = this.itemNum;
      this.swrapper.height(this.itemHeight * num);
    },

    _position: function () {
      if (!this.scroll) return;
      var index = this.datamodel.index, _top;
      if (this.itemNum - index < this.displayNum) index = this.itemNum - this.displayNum;

      _top = (this.itemHeight * index) * (-1);
      this.scroll.scrollTo(0, _top);
    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    addEvent: function ($super) {
      $super();

      //这个要在第一位，因为后面会执行父类的position方法居中，尺寸没有就不行
      this.on('onShow', function () {
        this.initSize();
        if (this.scroll && this.scroll.destory) this.scroll.destory();
        if (this.itemNum > this.displayNum) {
          this.scroll = new UIScroll({
            wrapper: this.swrapper,
            scroller: this.scroller
          });
          this._position();
        }

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
