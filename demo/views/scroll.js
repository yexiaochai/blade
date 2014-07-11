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

    _initSlider: function () {
      if (this.slider) return;

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
//          sec.html('当前选择：' + 'id: ' + item.id + ', ' + 'name: ' + item.name);
        }
      });
      this.slider.show();
    },

    /*
 

    */
    _imgSlider: function () {
      if (this.imgSlider) return;

      var data = [
        { id: 1, src: 'http://res.m.ctrip.com/market/appimg/h5/20140704/1.jpg', href: 'http://pages.ctrip.com/commerce/promote/201406/other/xzkhd/index.html' },
        { id: 2, src: 'http://res.m.ctrip.com/market/appimg/h5/20140704/2.jpg', href: 'http://pages.ctrip.com/commerce/promote/201406/other/xzkhd/index.html' },
        { id: 3, src: 'http://res.m.ctrip.com/market/appimg/h5/20140704/3.jpg', href: 'http://pages.ctrip.com/commerce/promote/201406/other/xzkhd/index.html' },
        { id: 4, src: 'http://res.m.ctrip.com/market/appimg/h5/20140704/4.jpg', href: 'http://pages.ctrip.com/commerce/promote/201406/vacation/h5/66h5_1.html' },
      ];


      this.imgSlider = new UISlider({
        datamodel: {
          data: data,
          itemFn: function (item) {
            return '<img src="' + item.src + '">';
          }
        },
        displayNum: 1,
        wrapper: this.$('.demo2'),
        changed: function (item) {
        }
      });

      this.imgSlider.show();

    },

    onShow: function () {
      this._initSlider();
      this._imgSlider();
    },
    onHide: function () {
    }
  });
});
