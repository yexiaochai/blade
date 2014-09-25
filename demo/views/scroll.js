define(['View', getViewTemplatePath('scroll'), 'UISlider', 'UICalendar', 'UIImageSlider'], function (View, viewhtml, UISlider, UICalendar, UIImageSlider) {
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
          data: data,
          itemFn: function (item) {
            return '<div style="width: 90%; height: 95%; background: white; border: 1px solid black; ">' + item.name + '</div>';
          }
        },
        momentum: true,
        displayNum: 3,
        wrapper: this.$('.demo1'),
        changed: function (item) {
          sec.html('当前选择：' + 'id: ' + item.id + ', ' + 'name: ' + item.name);
        }

      });
      this.slider.show();
    },

    /*
 

    */
    _imgSlider: function () {
      if (this.imgSlider) return;

      var data = [
        { id: 1, src: './res/img/1.jpg', href: './res/img/1.jpg' },
        { id: 2, src: './res/img/2.jpg', href: './res/img/2.jpg' },
        { id: 3, src: './res/img/3.jpg', href: './res/img/3.jpg' },
        { id: 4, src: './res/img/4.jpg', href: './res/img/4.jpg' }
      ];

      //      this.imgSlider = new UISlider({
      //        datamodel: {
      //          data: data,
      //          itemFn: function (item) {
      //            return '<img src="' + item.src + '">';
      //          }
      //        },
      //        displayNum: 1,
      //        wrapper: this.$('.demo2'),
      //        changed: function (item) {
      //        }
      //      });

      this.imgSlider = new UIImageSlider({
        datamodel: {
          data: data,
          itemFn: function (item) {
            return '<img data-src="' + item.src + '" src="' + item.src + '" >';
          }
        },
        autoPlay: true,
        handleItem: function (index, wrapper) {
          var s = '';
        },
        displayNum: 1,
        wrapper: this.$('.demo2')
      });
      this.imgSlider.show();

    },

    _initSwitch: function () {
      if (this.switch1) return;

      var sec = this.$('.demo3_sec');
      var data = [
    { id: 'on', name: 'on', checked: true }, { id: 'off', name: 'off', checked: false}];

      this.switch1 = new UISlider({
        datamodel: {
          data: data,
          className: 'c-switch',
          itemFn: function (item) {
            var str = '';
            if (item.id == 'on') {
              return '<div ><span class="c-switch-show" style="font-size: 0.8em;">ON</span><label >&nbsp;</label></div>';
            }
            if (item.id == 'off') {
              return '<div ><label>&nbsp;</label><span  class="c-switch-hide" style="font-size: 0.8em;">OFF</span></div>';
            }
          }
        },
        animatTime: 500,
        momentum: false,
        displayNum: 1,
        wrapper: this.$('.demo3'),
        changed: function (item) {
          sec.html('当前选择：' + 'id: ' + item.id + ', ' + 'name: ' + item.name);
        },
        itemClick: function (item) {
          console.log(item.checked);
          if (item.checked) {
            this.setId('off');
          } else {
            this.setId('on');
          }
        }
      });
      this.switch1.show();

      var item = this.switch1.getSelected();

      sec.html('当前选择：' + 'id: ' + item.id + ', ' + 'name: ' + item.name);


    },

    _initCalendar: function () {
      if (this.slider1) return;
      var scope = this;

      var sec = this.$('.demo3_sec');
      var data = [{}, {}, {}, {}, {}];

      this.slider1 = new UISlider({
        datamodel: {
          data: data

        },
        momentum: false,
        displayNum: 1,
        wrapper: this.$('.demo4'),
        changed: function (item) {
          //          sec.html('当前选择：' + 'id: ' + item.id + ', ' + 'name: ' + item.name);
        },
        itemClick: function (item) {
        },

        freeInstance: function () {
          if (!this.inlineInstance) return;
          for (var i = 0, len = this.inlineInstance.length; i < len; i++) {
            this.inlineInstance[i].destroy();
          }
          this.inlineInstance = null;
        },

        handleItem: function (index, wrapper) {
          this.on('onRefresh', function () {
            this.freeInstance();
          });

          this.on('onHide', function () {
            this.freeInstance();
          });

          if (!this.inlineInstance) this.inlineInstance = [];
          var dateObj = new Date();
          var dateObj = new Date(dateObj.getFullYear(), dateObj.getMonth() + index, dateObj.getDate());
          if (!this.inlineInstance[index]) {
            this.inlineInstance[index] = new UICalendar({
              dateObj: dateObj,
              datamodel: {
                displayMonthNum: 1
              },
              wrapper: wrapper,
              onItemClick: function (date) {
                scope.showToast(date);
              }
            });
          }
          this.inlineInstance[index].show();
        }
      });
      this.slider1.show();

      window.sss = this.slider1;


    },

    onShow: function () {
      var sss = function () {
        var demo = this.$('.demo2');
        var flag = parseInt(demo.width() - 400);
        demo.height(150 + 0.4 * flag);
      };
      sss();
      this._initSlider();
      this._imgSlider();
      this._initSwitch();
      this._initCalendar();

      $(window).on('resize.ttt', $.proxy(function () {
        sss();
      }, this));

    },
    onHide: function () {
      this.imgSlider.stop();
      $(window).off('ttt');
    }
  });
});
