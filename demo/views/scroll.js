define(['View', getViewTemplatePath('scroll'), 'UIScroll'], function (View, viewhtml, UIScroll) {
  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },
    events: {
      'click .demo1': 'demo1',
      'click .demo2': 'demo2'
    },
    demo1: function () {
      if (!this.scroll1) {
        this.scroll1 = new UIScroll();
      }
      this.scroll1.show();
    },
    demo2: function () {
      if (!this.scroll2) {
        this.scroll2 = new UIScroll({
        });
      }
      this.scroll2.show();
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
