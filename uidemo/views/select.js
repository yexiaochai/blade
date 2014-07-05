define(['View', getViewTemplatePath('select'), 'UISelect'], function (View, viewhtml, UISelect) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);

    },

    events: {

    },

    onPreShow: function () {

      var data1 = [];
      for (var i = 0; i < 100; i++) {
        var obj = { id: 'q_' + i, name: '项目_' + i };
        if (i % 3 == 0) obj.disabled = true;
        data1.push(obj);
      }

      //简单实例化 ，固定在底部
      if (!this.demo) {
        this.demo = new UISelect({
          wrapper: this.$('.cui-bottom-fixed'),
          datamodel: {
            data: data1
          }
        });
      }

      //设置参数，重写change事件
      if (!this.demo2) {
        this.demo2 = new UISelect({
          wrapper: this.$('.cui-citys-bd'),
          datamodel: {
            data: data1
          },
          scrollOffset: 111,
          animatTime:2000,
          displayNum: 3,
          changed: function(item) {
            console.log('自定义changed',item);
          }
        });
      }

      this.demo.show();
      this.demo2.show();

      this.turning();
    },

    onShow: function () {

    },

    onHide: function () {

    }

  });
});
