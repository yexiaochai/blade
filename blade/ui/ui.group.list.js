/*
******bug******
这里针对搜索所做功能过于薄弱，需要处理

*/
define(['UIView', 'text!T_UIGroupList', 'text!C_UIGroupList'], function (UIView, template, style) {
  'use strict';

  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();
      this.template = template;
      this.addUIStyle(style);

      //数据源
      this.data = [];
      //搜索时候可以用于搜索的字段
      this.filter = 'name';

      //类型为layer
      this.setUIType('grouplist');

      //内部会用到的一些私有属性
      this._expandedClass = 'expanded';

      this.addEvents({
        'click .js_group': 'groupAction',
        'click .js_items>li': 'itemAction'
      });

      this.onGroupClick = function (index, items, e) { };

      this.onItemClick = function (item, groupIndex, index, e) {
        console.log(arguments);
      };
    },

    //根据组件属性生成用于生成事件的数据对象
    getViewModel: function () {
      return this._getDefaultViewModel(['data', 'filter']);
    },

    itemAction: function (e) {
      var el = $(e.currentTarget);
      var gindex = el.attr('data-group');
      var index = el.attr('data-index');
      var item = this.data[gindex].data[index];

      if (this.onItemClick) this.onItemClick.call(this, item, gindex, index, e);
    },

    groupAction: function (e) {
      var el = $(e.currentTarget).parent();
      var index = el.attr('data-groupindex');
      var items = this.data[index];

      if (el.hasClass(this._expandedClass)) {
        el.removeClass(this._expandedClass);
      } else {
        el.addClass(this._expandedClass);
      }

      if (this.onGroupClick) this.onGroupClick.call(this, index, items, e);
    },

    //这个代码需要再优化
    getFilterList: function (key) {
      var list = this.$('li[data-filter*="' + key + '"]');
      return list.clone(); ;
    },

    initElement: function () {
      this.groups = this.$('.js_group');
    },

    initialize: function ($super, opts) {
      $super(opts);
    }

  });

});
