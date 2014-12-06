define([getViewClass('index'), getViewTemplatePath('index.ipad'), 'UIGroupList'], function (View, viewhtml, UIGroupList) {
  return _.inherit(View, {
    propertys: function ($super) {
      $super();
      this.template = viewhtml;

    },

    onCreate: function ($super) {
      $super();
      this.subWrapper = this.$('.sub_viewport');

    },

    onPreShow: function ($super) {
      $super();
      this.turning();
    },

    onShow: function ($super) {
      $super();
      this.initGoupList();
    },

    onHide: function ($super) {
      $super();
    },

    events: {

    },

    searchItemAction: function (e) {
      var gindex = $(e.currentTarget).attr('data-group');
      var index = $(e.currentTarget).attr('data-index');
      this.loadSubView(this.uidata[gindex].data[index].uiname, this.subWrapper);

    },

    demoItemAction: function (item, groupIndex, index, e) {
      this.loadSubView(item.uiname, this.subWrapper);

    }

  });
});
