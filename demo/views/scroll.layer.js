define(['View', getViewTemplatePath('scroll.layer'), 'UIScrollLayer'], function (View, viewhtml, UIScrollLayer) {
  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },
    events: {
      'click .demo1': 'demo1',
      'click .demo2': 'demo2'
    },
    demo1: function () {
      if (!this.scrollLayer) {
        this.scrollLayer = new UIScrollLayer({
          html: 'nimeizi'
        });
      }
      this.scrollLayer.show();
    },
    demo2: function () {
      if (!this.scrollLayer2) {
        this.scrollLayer2 = new UIScrollLayer({
        });
      }
      this.scrollLayer2.show();
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