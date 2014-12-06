﻿
define(['UIView', getAppUITemplatePath('ui.calendar')], function (UIView, template) {

  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;

      this.dateObj = new Date();

      //阳历节日
      this.solarHoliday = {
        '0101': '元旦',
        '0214': '情人节',
        '0308': '妇女节',
        '0312': '植树节',
        '0314': '白情',
        '0401': '愚人节',
        '0405': '清明',
        '0501': '劳动节',
        '0504': '青年',
        '0531': '无烟',
        '0601': '儿童',
        '0910': '教师',
        '1001': '国庆',
        '1225': '圣诞节'
      };

      //阴历节日
      this.lunarHoliday = {
        '20150218': '除夕',
        '20150219': '春节',
        '20150305': '元宵',
        '20150405': '清明',
        '20150620': '端午',
        '20150820': '七夕',
        '20150828': '中元',
        '20150927': '中秋',
        '20151021': '重阳',

        '20160207': '除夕',
        '20160208': '春节',
        '20160222': '元宵',
        '20160404': '清明',
        '20160609': '端午',
        '20160809': '七夕',
        '20160817': '中元',
        '20160915': '中秋',
        '20161009': '重阳',

        '20170127': '除夕',
        '20170128': '春节',
        '20170211': '元宵',
        '20170404': '清明',
        '20170530': '端午',
        '20170828': '七夕',
        '20170905': '中元',
        '20171004': '中秋',
        '20171028': '重阳',

        '20180215': '除夕',
        '20180216': '春节',
        '20180302': '元宵',
        '20180405': '清明',
        '20180618': '端午',
        '20180817': '七夕',
        '20180825': '中元',
        '20180924': '中秋',
        '20181017': '重阳'

      };

      //特殊时刻
      this.specialDates = false;

      //要求必须要传入日期对象
      this.datamodel = {
        scope: this,
        weekDayArr: ['日', '一', '二', '三', '四', '五', '六'],
        displayMonthNum: 5,
        curTime: (new Date(this.dateObj.getFullYear(), this.dateObj.getMonth(), this.dateObj.getDate())).getTime(),

        //当前选择的日期
        selectDate: null,
        //分割月之间的显示
        MonthClapFn: function (year, month) {
          month = month + 1;
          return year + '年' + (month) + '月';
        },
        //具体显示项目定制化
        dayItemFn: function (year, month, day, dateObj, difftime) {

          var dayObj = {
            day: day
          };
          var dayStrArr = [];
          var _solarHoliday = _.dateUtil.formatNum(month + 1) + _.dateUtil.formatNum(day);
          var _lunarHoliday = year.toString() + _.dateUtil.formatNum(month + 1) + _.dateUtil.formatNum(day);

          //处理日
          if (difftime == 0) {
            dayObj.day1 = '今天';
          } else if (difftime / 3600000 == 24) {
            dayObj.day1 = '明天';
          } else if (difftime / 3600000 == 48) {
            dayObj.day1 = '后天';
          }

          //处理节日
          if (this.solarHoliday[_solarHoliday]) {
            dayObj.solarHoliday = this.solarHoliday[_solarHoliday];
          }

          //阴历节日
          if (this.lunarHoliday[_lunarHoliday]) {
            dayObj.lunarHoliday = this.lunarHoliday[_lunarHoliday];
          }

          //处理特殊标志
          if (this.specialDates) {
            //默认不处理特殊标志，但是阴历需要处理
          }

          dayStrArr[0] = '<em>' + ( dayObj.day1 || dayObj.day) + '</em>';

          if (dayObj.solarHoliday || dayObj.lunarHoliday) {
            dayStrArr[1] = '<i>' + (dayObj.lunarHoliday || dayObj.solarHoliday )+ '</i>';
          }

          if (this.dayItemAction) {
            return this.dayItemAction.call(this, dayObj, year, month, day, dateObj, difftime);
          }
          else return dayStrArr.join('');
        }
      };

      this.dayItemAction = null;

      this.events = {
        'click .cui_calendar_item ': 'itemAction'
      };

      this.onItemClick = function (date, el, e) {
        console.log(arguments);
      };

    },

    addDisplayMonth: function (num) {
      this.datamodel.displayMonthNum = this.datamodel.displayMonthNum + num;
      this.refresh();
    },

    //要求唯一标识，根据id确定index
    resetPropery: function () {
      this.datamodel.year = this.dateObj.getFullYear();
      this.datamodel.month = this.dateObj.getMonth();
      //结束日期
      this.datamodel.endDate = new Date(this.datamodel.year, this.datamodel.month + this.datamodel.displayMonthNum, 0);
    },

    itemAction: function (e) {
      var el = $(e.currentTarget);
      if (el.hasClass('cui_cld_daypass')) return;
      var date = el.attr('data-date');
      date = date.split('-');
      if (date.length != 3) return false;

      date = new Date(date[0], date[1], date[2]);

      if (this.onItemClick) this.onItemClick.call(this, date, el, e);
    },

    initElement: function () {
      this.weekDay = this.$('.cui_cldweek');
    },

    initialize: function ($super, opts) {
      $super(opts);
    }

  });

});
