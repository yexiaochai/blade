define(['View', getViewTemplatePath('pageview'), 'UINum'], function (View, viewhtml, UINum) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },

    events: {
      'click .fxdemo': function () {
        if (!this.num1)
          this.num1 = new UINum({
            datamodel: {
              min: 2,
              max: 6,
              curNum: 1,  //默认值，小于min会自动设置为min值
              unit: '只',
              needText: false
            },
            //把组件放入指定容器，不知道这样对不对。
            wrapper: this.$el.find('.simple_num1')
          });

        this.showPageview(this.num1);
      },
      'click .fxdemo1': function () {
this.showPageview(null, function () {
  this.pageViewContent.html('1111');
}, function () {
  //这里注意做清理操作
  this.pageViewContent.html('');
});
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
