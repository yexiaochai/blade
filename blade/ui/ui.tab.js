define(['UIView', getAppUITemplatePath('ui.tab')], function (UIView, template) {


  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;
      this.datamodel = {
        data: [],
        index: 0
      };

      this.events = {
        'click .js_item_wrapper>li': 'clickAction'
      };

      this.onChange = function (data) {
        console.log(arguments);
      };

      this.itemWidth = 0;
      this.needWrapperRoot = false;

    },

    //重置index与值的关系
    resetPropery: function () {
      if (this.datamodel.index < 0 || this.datamodel.index > this.datamodel.data.length) {
        this.datamodel.index = 0;
      }

      if (!this.datamodel.selectedKey) {
        this.datamodel.selectedKey = this.datamodel.data[this.datamodel.index].id;
        return;
      }

      for (var i = 0, len = this.datamodel.data.length; i < len; i++) {
        if (this.datamodel.selectedKey == this.datamodel.data[i].id) {
          this.datamodel.index = i;
          break;
        }
      }
    },

    initElement: function () {
      this.el = this.$('.active');
      this.scrollbar = this.$('.js_scrollbar')
      this.tabs = this.$('li');

    },

    clickAction: function (e) {
      var el = $(e.currentTarget);
      var i = el.attr('data-index');
      var data = this.datamodel.data[i];
      var isChange = false;

      this.datamodel.selectedKey = i;
      this.setIndex(i);

    },

    setVal: function (v) {
      this.el = this.$('li[data-key="' + v + '"]');
      var index = this.el.attr('data-index');
      var d = this.datamodel.data[index];
      if (!d) { console.log('设置值有误'); return; }

      //如果当前值与设置的值不相等就change了 
      var isChange = this.datamodel.selectedKey == v;
      this.datamodel.selectedKey = v;

      this.tabs.removeClass('active');
      this.el && this.el.addClass('active');

      this.scrollbar.css('left', this.itemWidth * index);

      if (isChange == false && typeof this.onChange == 'function') {
        this.onChange.call(this, d);
      }

    },

    getVal: function () {
      return this.datamodel.selectedKey;
    },

    setIndex: function (i) {
      //如果设置值无意义便不予关注
      if (i < 0 || i > this.datamodel.data.length - 1) return;
      this.setVal(this.datamodel.data[i].id);
    },

    getIndex: function () {
      for (var i = 0, len = this.datamodel.data.length; i < len; i++) {
        if (this.getVal() == this.datamodel.data[i].id) return i;
      }
      return -1;
    },

    addEvent: function ($super) {
      $super();
      this.on('onShow', function () {
        if (this.scrollbar && this.tabs) {
          this.itemWidth = $(this.tabs[0]).width();
          this.scrollbar.width(this.itemWidth);
        }
      });
    },

    initialize: function ($super, opts) {
      $super(opts);
    }

  });


});
