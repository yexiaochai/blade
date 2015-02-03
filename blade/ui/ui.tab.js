define(['UIView', 'text!T_UITab', 'text!C_UITab'], function (UIView, template, style) {

  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;
      this.addUIStyle(style);

      this.data = [];
      this.index = 0;

      this.events = {
        'click .js_item_wrapper>li': 'clickAction'
      };

      this.onChange = function (data) {
        console.log(arguments);
      };

      //内部使用属性，用于定义动画下划线
      this._itemWidth = 0;
      this.checkedClass = 'active';
    },

    getViewModel: function () {
      return this._getDefaultViewModel(['data', 'index']);
    },

    //重置index与值的关系
    resetPropery: function () {
      if (this.index < 0 || this.index > this.data.length) {
        this.index = 0;
      }

      if (!this.selectedKey) {
        this.selectedKey = this.data[this.index].id;
        return;
      }

      for (var i = 0, len = this.data.length; i < len; i++) {
        //这里需要防止selectedKey为空，并且id为空的情况
        if (this.selectedKey === this.data[i].id) {
          this.index = i;
          break;
        }
      }
    },

    initElement: function () {
      this.scrollbar = this.$('.js_scrollbar')
      this.tabs = this.$('li');

    },

    clickAction: function (e) {
      var el = $(e.currentTarget);
      var i = el.attr('data-index');
      var data = this.data[i];
      var isChange = false;

      this.setIndex(i);

    },

    setVal: function (v) {
      this.el = this.$('li[data-key="' + v + '"]');
      var index = this.el.attr('data-index');
      var d = this.data[index];
      if (!d) { console.log('设置值有误'); return; }

      //如果当前值与设置的值不相等就change了 
      var isChange = this.selectedKey == v;
      this.selectedKey = v;

      this.tabs.removeClass(this.checkedClass);
      this.el && this.el.addClass(this.checkedClass);

      this.scrollbar.css('left', this._itemWidth * index);

      if (isChange == false && typeof this.onChange == 'function') {
        this.onChange.call(this, d);
      }

    },

    getVal: function () {
      return this.selectedKey;
    },

    setIndex: function (i) {
      //如果设置值无意义便不予关注
      if (i < 0 || i > this.data.length - 1) return;
      this.setVal(this.data[i].id);
    },

    getIndex: function () {
      for (var i = 0, len = this.data.length; i < len; i++) {
        if (this.getVal() == this.data[i].id) return i;
      }
      return -1;
    },

    addEvent: function ($super) {
      $super();
      this.on('onShow', function () {
        if (this.scrollbar && this.tabs) {
          this._itemWidth = $(this.tabs[0]).width();
          this.scrollbar.width(this._itemWidth);
        }
      });
    }

  });


});
