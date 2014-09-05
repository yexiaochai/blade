define(['View', getViewTemplatePath('warning404'), 'UIGroupList', 'UIPageView', 'UIWarning404'], function (View, viewhtml, UIGroupList, UIPageView, UIWarning404) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
      this.initElement();

      this.TXTTIMERRES = null;

    },

    initElement: function () {
      this.cancelBtn = this.$('.cui-btn-cancle');
      this.searchBox = this.$('.cui-input-box');
      this.txtWrapper = this.$('.cui-citys-hd');
      this.searchList = this.$('.seach-list');

    },

    events: {
      'click .demo1': function () {
        if (!this.layer404) {
          this.layer404 = new UIPageView();
        }
        this.layer404.animateShow(new UIWarning404());
      }
    },

    onPreShow: function () {
      this.turning();
    },

    onShow: function () {

    },

    onHide: function () {

    }

  });
});
