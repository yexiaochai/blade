/*
getFilterList这块需要重新处理，不然事件会丢失
*/
define(['UIView', getAppUITemplatePath('ui.group.list')], function (UIView, template) {


  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();
      this.template = template;

      this.datamodel = {
        data: [],
        filter: 'name'
      };

      this.events = {
        'click .cui-city-t': 'groupAction',
        'click .cui-city-n>li': 'itemAction'
      };

      this.onGroupClick = function (index, items, e) {
      };

      this.onItemClick = function (item, groupIndex, index, e) {
        console.log(arguments);
      };
    },

    itemAction: function (e) {
      var el = $(e.currentTarget);
      var gindex = el.attr('data-group');
      var index = el.attr('data-index');
      var item = this.datamodel.data[gindex].data[index];

      if (this.onItemClick) this.onItemClick.call(this, item, gindex, index, e);
    },

    groupAction: function (e) {
      var el = $(e.currentTarget).parent();
      var index = el.attr('data-groupindex');
      var items = this.datamodel.data[index];

      if (el.hasClass('cui-arrow-open')) {
        this.closeGroup(index);
      } else {
        this.openGroup(index);
      }

      if (this.onGroupClick) this.onGroupClick.call(this, index, items, e);
    },

    getFilterList: function (key) {
      var list = this.$('li[data-filter*="' + key + '"]');
      return list.clone(); ;
    },

    openGroup: function (i) {
      this._switchStatus(i, 'cui-arrow-close', 'cui-arrow-open')
    },

    closeGroup: function (i) {
      this._switchStatus(i, 'cui-arrow-open', 'cui-arrow-close')
    },

    _switchStatus: function (i, cls1, cls2) {
      if (typeof i == 'undefined') {
        this.groups.removeClass(cls1);
        this.groups.addClass(cls2);
        return;
      }
      var el = this.$('li[data-groupindex="' + i + '"]')
      el.addClass(cls2);
      el.removeClass(cls1);
    },

    initElement: function () {
      this.groups = this.$('.cui-city-itmes>li');
    },

    initialize: function ($super, opts) {
      $super(opts);
    }

  });

});
