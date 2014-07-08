define(['UIView', getAppUITemplatePath('ui.tab')], function (UIView, template) {


  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;
      this.datamodel = {
        data: [],
        curClass: 'cui-tab-current',
        index: 0
      };

      this.events = {
        'click .cui-tab-mod>li': 'clickAction'
      };

      this.onChange = function (data) {

        console.log(arguments);
      };

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
      this.el = this.$('.cui-tab-current');
      this.tab = this.$('.cui-tab-scrollbar')
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

      this.tabs.removeClass(this.datamodel.curClass);
      this.el && this.el.addClass(this.datamodel.curClass);

      //三星手机渲染有问题，这里动态引起一次回流，这个逻辑需要加入到基类
      if (navigator.userAgent.toLowerCase().indexOf('android') > -1) {
        var width = this._tab.css('width');
        setTimeout($.proxy(function () {
          this._tab.css('width', width);
        }, this), 0);
      }

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

    initialize: function ($super, opts) {
      $super(opts);
    },

    addEvent: function ($super) {
      $super();
      //      this.on('onCreate', function () {
      //        this.$el.addClass('cui-loading');
      //      });

    }

  });


});
