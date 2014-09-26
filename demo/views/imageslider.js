/**
 * Created by jp_wang on 2014/9/25.
 */
define(['View', getViewTemplatePath('imageslider'), 'UIImageSlider'], function (View, viewhtml, UIImageSlider) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },

    _imgSlider: function () {
      if (this.imgSlider) return;

      var data = [
          { id: 1, src: './res/img/1.jpg', href: './res/img/1.jpg' },
          { id: 2, src: './res/img/2.jpg', href: './res/img/2.jpg' },
          { id: 3, src: './res/img/3.jpg', href: './res/img/3.jpg' },
          { id: 4, src: './res/img/4.jpg', href: './res/img/4.jpg' }
      ];

      this.imgSlider = new UIImageSlider({
        datamodel: {
          data: data,
          itemFn: function (item) {
            return '<img data-src="' + item.src + '" src="' + item.src + '" >';
          }
        },
        displayNum: 1,
        wrapper: this.$('.silder')
      });
      this.imgSlider.show();

    },

    _imgSlider1: function () {
      if (this.imgSlider1) return;

      var data = [
          { id: 1, src: './res/img/1.jpg', href: './res/img/1.jpg' },
          { id: 2, src: './res/img/2.jpg', href: './res/img/2.jpg' },
          { id: 3, src: './res/img/3.jpg', href: './res/img/3.jpg' },
          { id: 4, src: './res/img/4.jpg', href: './res/img/4.jpg' }
      ];

      this.imgSlider1 = new UIImageSlider({
        datamodel: {
          data: data,
          itemFn: function (item) {
            return '<img data-src="' + item.src + '" src="' + item.src + '" >';
          }
        },
        createNav: function () {
          if (this.sliderNav) return;
          var nav = '<div class="cui-navContainer cui-slide-nav-new" style="background: #f2f2f2; color: rgb(20, 145, 197); position: absolute; width: 100%; bottom: 0;">';
          for (var i = 0; i < this.itemNum; i++) {
            nav += '<span class="cui-slide-nav-item" data-index="' + i + '"></span>';
          }
          nav += '</div>';
          this.sliderNav = $(nav);
          this.sliderNav.find('span').width(this.wrapper.width() / this.itemNum);

          this.$el.append(this.sliderNav);
          this.setzIndexTop(this.sliderNav);
          this._setNavIndex(this.datamodel.index);
        },
        displayNum: 1,
        wrapper: this.$('.silder1')
      });
      this.imgSlider1.show();

    },

    onPreShow: function () {
      this.turning();
    },

    demo1: function () {
      var resetWrapper = function () {
        var demo = this.$('.imageslider');
        var flag = parseInt(demo.width() - 400);
        demo.height(150 + 0.4 * flag);
      };
      resetWrapper();
      this._imgSlider();
      this._imgSlider1();
      $(window).on('resize.imageslider1', $.proxy(function () {
        resetWrapper();
      }, this));
    },

    onShow: function () {
      this.demo1();

    },
    onHide: function () {
      this.imgSlider.stop();
      this.imgSlider1.stop();
      $(window).off('imageslider1');
    }
  })
})