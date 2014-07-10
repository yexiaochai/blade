define(['View', getViewTemplatePath('scroll'), 'UISlider'], function (View, viewhtml, UISlider) {
  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },
    events: {

    },

    onPreShow: function () {

      this.turning();
    },
    onShow: function () {
      var sec = this.$('.demo1_sec');
      var data = [
  { id: 1, name: '中国' }, { id: 2, name: '美国' }, { id: 3, name: '英国' }
];
      for (var i = 0; i < 20; i++) {
        data.push({ id: i + 4, name: '中国' + i });
      }
      this.slider = new UISlider({
        datamodel: {
          data: data
        },
        wrapper: this.$('.demo1'),
        changed: function (item) {
          sec.html('当前选择：' + 'id: ' + item.id + ', ' + 'name: ' + item.name);
        }
      });
      this.slider.show();

    },
    onHide: function () {
    }
  });
});
