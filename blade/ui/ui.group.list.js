
define(['UIView', getAppUITemplatePath('ui.group.list')], function (UIView, template) {


  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();
      this.template = template;
      var groupList1 = [
          { 'uiname': 'inputclear', 'name': 'input清除' },
          { 'uiname': 'switch', 'name': 'switch切换' },
          { 'uiname': 'num', 'name': '数字插件' },
          { 'uiname': 'tabs', 'name': 'tabs标签插件' }
      ];

      //分组列表
      var groupList2 = [
          { 'uiname': 'selectcity', 'name': '城市列表' },
          { 'uiname': 'qqlist', 'name': 'qq列表' },
          { 'uiname': 'ajaxselect', 'name': '城市列表ajax' }
      ];

      //带滚动条的弹出层
      var groupList3 = [
          { 'uiname': 'scrollradio', 'name': 'scrollRadio用车时间/时间' },
          { 'uiname': 'scrollradiolist', 'name': 'scrollRadioList插件' },
          { 'uiname': 'tipslayer', 'name': 'tipslayer插件/装载html结构' },
          { 'uiname': 'mask', 'name': 'mask组件/自定义html弹窗' }
      ];

      //提示类
      var groupList4 = [
          { 'uiname': 'alert', 'name': '警告框' },
          { 'uiname': 'confirm', 'name': '确认框' },
          { 'uiname': 'toast', 'name': 'toast框' },
          { 'uiname': 'loading', 'name': 'loading框' },
          { 'uiname': 'warning404', 'name': 'warning404' },
          { 'uiname': 'headwarning', 'name': '带头部警告' }
      ];

      var uidata = [
          { name: '常用插件', data: groupList1 },
          { name: '分组列表', data: groupList2 },
          { name: '带滚动条的弹出层', data: groupList3, needFold: true },
          { name: '提示类', data: groupList4 }
      ];


      this.datamodel = {
        data: uidata,
        filter: 'name, uiname'
      };

      this.events = {
        'click .cui-city-t': 'groupAction',
        'click .cui-city-n>li': 'itemAction'
      };

      this.OnGroupClick = function (index, items, e) {
      };

      this.OnItemClick = function (item, groupIndex, index, e) {
        console.log(arguments);
      };

    },

    itemAction: function (e) {
      var el = $(e.currentTarget);
      var gindex = el.attr('data-group');
      var index = el.attr('data-index');
      var item = this.datamodel.data[gindex].data[index];

      if (this.OnItemClick) this.OnItemClick.call(this, item, gindex, index, e);
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

      if (this.OnGroupClick) this.OnGroupClick.call(this, index, items, e);
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
      this.groups = this.$('.cui-city-itmes');

    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    addEvent: function ($super) {
      $super();
    }
  });

});
