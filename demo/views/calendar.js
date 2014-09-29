define(['View', getViewTemplatePath('calendar'), 'UICalendar', 'UISlider'], function (View, viewhtml, UICalendar, UISlider) {
  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },
    curDateType: 'start',
    events: {
      'click .demo1': function () {
        var scope = this;
        if (!this.calendarlayer) {
          this.calendarlayer = new UIPageView();
        }
        this.calendarlayer.animateShow(new UICalendar({
          datamodel: {
            displayMonthNum: 5
          },
          onShow: function () {
            console.log('onShow');
          },
          onHide: function () {
            console.log('onHide');
          },
          onItemClick: function (item) {
            scope.calendarlayer.animateHide();
            scope.showToast(item);
          }
        }));
      },
      'click #cale_tab li': function (e) {
        var el = $(e.currentTarget);
        this.$('#cale_tab li').removeClass('cur');
        el.addClass('cur');
        this.curDateType = el.attr('data-type');
        this.calendar3.refresh();

      },
      'click .pre_calendar': function () {
        if (this.cSlider1) this.cSlider1.setIndex(this.cSlider1.getIndex() - 1);
      },

      'click .next_calendar': function () {
        if (this.cSlider1) this.cSlider1.setIndex(this.cSlider1.getIndex() + 1);
      }

    },

    demo1: function () {
      var scope = this;
      //简单初始化
      if (!this.calendar) {
        this.calendar = new UICalendar({
          datamodel: {
            displayMonthNum: 1
          },
          onItemClick: function (date, el) {
            scope.showToast(date.toString())
          },
          wrapper: this.$el.find('.wrapper')
        });
      }
      this.calendar.show();
    },

    demo11: function () {
var scope = this;

//日历显示索引
this.cIndex = 0;
this.preCalendar = this.curCalendar = this.nextCalendar = null;

var data = [];
for (var i = 0; i < 20; i++) {
  data[i] = {};
}

if (!this.cSlider1) {
  this.cSlider1 = new UISlider({
    datamodel: { data: data,
      itemFn: function (item, key, index) {
        return '';
      }
    },
    momentum: false,
    displayNum: 1,
    wrapper: this.$('.wrapper11'),
    changed: function (item) {
      monthChanged();
    }
  });
}
this.cSlider1.show();

var monthChanged = $.proxy(function () {
  this.cIndex = this.cSlider1.getIndex();

  var dateObj = new Date();

  if (!this.preCalendar) {
    this.preCalendar = new UICalendar({
      datamodel: {
        MonthClapFn: function () {
          return '';
        },
        displayMonthNum: 1
      }
    });
  }
  if (!this.curCalendar) {
    this.curCalendar = new UICalendar({
      datamodel: {
        MonthClapFn: function () {
          return '';
        },
        displayMonthNum: 1
      }
    });
  }
  if (!this.nextCalendar) {
    this.nextCalendar = new UICalendar({
      datamodel: {
        MonthClapFn: function () {
          return '';
        },
        displayMonthNum: 1
      }
    });
  }

  this.preCalendar.dateObj = new Date(dateObj.getFullYear(), (dateObj.getMonth() + this.cIndex - 1), dateObj.getDate());
  this.preCalendar.wrapper = this.cSlider1.$el.find('li[data-index="' + (this.cIndex - 1) + '"]');

  this.curCalendar.dateObj = new Date(dateObj.getFullYear(), (dateObj.getMonth() + this.cIndex), dateObj.getDate());
  this.curCalendar.wrapper = this.cSlider1.$el.find('li[data-index="' + (this.cIndex) + '"]');

  this.nextCalendar.dateObj = new Date(dateObj.getFullYear(), (dateObj.getMonth() + this.cIndex + 1), dateObj.getDate());
  this.nextCalendar.wrapper = this.cSlider1.$el.find('li[data-index="' + (this.cIndex + 1) + '"]');

  if (this.cSlider1.$el.find('li[data-index="' + (this.cIndex - 1) + '"]')[0]) {
    this.preCalendar.refresh();
    this.preCalendar.show();
  } else {
    this.preCalendar.hide();
  }

  this.curCalendar.refresh();
  this.curCalendar.show();

  this.nextCalendar.refresh();
  this.nextCalendar.show();

  scope.$('.cur_calendar').html(this.curCalendar.dateObj.getFullYear() + '年' + (this.curCalendar.dateObj.getMonth() + 1) + '月');

}, this);

monthChanged();

    },

    demo2: function () {

      var solarHoliday = {
        '1225': '圣诞节',
        '1001': '国庆节',
        '0909': '中秋节',
        '0701': '回归纪念日',
        '20140602': '端午节',
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

    demo3: function () {
      //      cale_con
      var scope = this;

      this.$('#cale_tab li').removeClass('cur');
      this.$('#cale_tab li[data-type=' + this.curDateType + ']').addClass('cur');


      var startDateDom = this.$('#startType');
      var endDateDom = this.$('#backType');

      var curDateObj = new Date();

      //存入时间戳
      var startDate = startDateDom.attr('date') || ((new Date(curDateObj.getFullYear(), curDateObj.getMonth(), curDateObj.getDate())).getTime());
      var endDate = startDateDom.attr('date') || (startDate + 3600000 * 24 * 5);


      //简单初始化
      if (!this.calendar3) {
        this.calendar3 = new UICalendar({
          datamodel: {
            displayMonthNum: 3,
            dayItemFn: function (year, month, day, dateObj, difftime) {
              //当前时间戳
              var curTime = dateObj.getTime();

              var dayStr = '<div';

              if (curTime == startDate) {
                dayStr += ' class="checked_start" ';
              }
              if (curTime > startDate && curTime < endDate) {
                dayStr += ' class="checked_middle" ';
              }
              if (curTime == endDate) {
                dayStr += ' class="checked_back" ';
              }
              if (scope.curDateType == 'back' && (curTime < startDate || curTime > (startDate + 3600000 * 24 * 30))) {
                dayStr += ' class="cui_cld_daypass" ';
              }

              dayStr = dayStr + '>';


              dayStr = dayStr + day;

              if (difftime == 0) {
                dayStr += '今天';
              } else if (difftime / 3600000 == 24) {
                dayStr += '明天';
              } else if (difftime / 3600000 == 48) {
                dayStr += '后天';
              }

              dayStr = dayStr + '</div>';

              return dayStr;
            }
          },
          onItemClick: function (date, e) {
            var time = date.getTime();
            var el = $(e.currentTarget);
            if (el.hasClass('cui_cld_daypass') || el.find('div').hasClass('cui_cld_daypass')) return;

            if (scope.curDateType == 'start') {
              startDate = time;
              if (endDate <= startDate)
                endDate = (startDate + 3600000 * 24 * 5);

              startDateDom.attr('date', startDate);
              endDateDom.attr('date', endDate);
              this.refresh();
            }
            if (scope.curDateType == 'back') {

              endDate = time;
              endDateDom.attr('date', endDate);
              this.refresh();
            }

            var _date1 = new Date(startDate);
            var _date2 = new Date(endDate);

            scope.$('#startT2').html((_date1.getMonth() + 1) + '月' + _date1.getDate() + '日');
            scope.$('#startT3').html(_date1.getFullYear() + '年' + '星期' + _date1.getDay());

            scope.$('#destT2').html((_date2.getMonth() + 1) + '月' + _date2.getDate() + '日');
            scope.$('#destT3').html(_date2.getFullYear() + '年' + '星期' + _date2.getDay());

          },
          wrapper: this.$el.find('#cale_con')
        });
      }
      this.calendar3.show();
      this.calendar3.refresh();

    },

    demo4: function () {


    },

    onPreShow: function () {
            this.demo1();
            this.demo2();
            this.demo3();
            this.demo4();

      this.turning();
    },

    onShow: function () {
      this.demo11();

    },

    onHide: function () {

    }

  });
});
