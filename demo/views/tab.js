define(['View', getViewTemplatePath('tab'), 'UITab', 'UISlider'], function (View, viewhtml, UITab, UISlider) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },

    events: {
      'click .getIndex': 'getIndex',
      'click .setIndex': 'setIndex'
    },

    getIndex: function () {
      var index = this.tab1.getIndex();
      this.$el.find('.getInfo').val(index);
    },

    setIndex: function () {
      var index = this.$el.find('.setInfo').val() || 0;
      this.tab1.setIndex(index);
    },

    onPreShow: function () {
      //简单初始化
      if (!this.tab) {
        this.tab = new UITab({
          datamodel: {
            data: [
              { id: 1, name: '中国' },
              { id: 2, name: '美国' },
              { id: 3, name: '日本' }
            ]
          },
          wrapper: this.$el.find('.wrapper')
        });
        this.tab.show();
      }

      //设置参数，重写change
      if (!this.tab1) {
        this.tab1 = new UITab({
          datamodel: {
            data: [
              { id: 1, name: '图片' },
              { id: 2, name: '音乐' },
              { id: 3, name: '视频' },
              { id: 4, name: '其它' }
            ],
            curClass: 'cui-tab-current',
            index: 0
          },
          onChange: function () {
            console.log('onChange myself:' + this.el.attr('data-key') + this.el.html());
          },
          wrapper: this.$el.find('.wrapper1')
        });
        this.tab1.show();
      }




      this.turning();
    },

    onShow: function () {
      var scope = this;
      //如果tab数量过多
      if (!this.tab2) {
        this.tab2 = new UISlider({
          datamodel: {
            data: [
              { id: 1, name: '图片' },
              { id: 2, name: '音乐' },
              { id: 3, name: '视频' },
              { id: 4, name: '其它' },
              { id: 11, name: '图1片' },
              { id: 12, name: '音1乐' },
              { id: 13, name: '视1频' },
              { id: 14, name: '其1它' }
            ],
            index: 0
          },
          changed: function (item) {
            scope.showToast(item.id+ ': '+item.name);
          },
          wrapper: this.$el.find('.wrapper2')
        });
        this.tab2.show();
      }
    },

    onHide: function () {

    }

  });
});
