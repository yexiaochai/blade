define(['View', getViewTemplatePath('calendar'), 'UICalendar', 'UIPageView'], function (View, viewhtml, UICalendar, UIPageView) {
  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },

    events: {
      'click .demo1': function () {
        if (!this.calendarlayer) {
          this.calendarlayer = new UIPageView({
            inlineInstance: new UICalendar({
              datamodel: {
                displayMonthNum: 5
              },
              onShow: function () {
                console.log('onShow');
              },
              onHide: function () {
                console.log('onHide');
              }
            })
          });
        }
        this.calendarlayer.animateShow();
      }
    },

    demo1: function () {
      //简单初始化
      if (!this.calendar) {
        this.calendar = new UICalendar({
          datamodel: {
            displayMonthNum: 1
          },
          wrapper: this.$el.find('.wrapper')
        });
      }
      this.calendar.show();
    },

    demo2: function () {

      var solarHoliday = {
        '1225': '圣诞节',
        '1001': '国庆节',
        '0909': '中秋节',
        '0701': '回归纪念日',
        '0602': '端午节',
        '0506': '佛诞',
        '0501': '劳动节',
        '0421': '复活节',
        '0419': '受难节翌日',
        '0418': '受难节',
        '0405': '清明节',
        '0203': '年初四',
        '0201': '年初二',
        '0131': '年初一',
        '0101': '元旦'
      };

      //简单初始化
      if (!this.calendar2) {
        this.calendar2 = new UICalendar({
          datamodel: {
            displayMonthNum: 3,
            dayItemFn: function (year, month, day) {
              var str = _.dateUtil.formatNum(month + 1) + _.dateUtil.formatNum(day);
              var tmp = day;
              if (solarHoliday[str])
                tmp = solarHoliday[str];

              return tmp;
            }
          },
          onItemClick: function (date, oldDay, e) {
            console.log(arguments)
          },
          wrapper: this.$el.find('.wrapper1')
        });
      }
      this.calendar2.show();
    },

    onPreShow: function () {
      this.demo1();
      this.demo2();


      this.turning();
    },

    onShow: function () {

    },

    onHide: function () {

    }

  });
});
