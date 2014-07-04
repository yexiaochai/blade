
define(['UIView', getAppUITemplatePath('ui.calendar')], function (UIView, template) {


  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;

      var dateObj = new Date();
      var t = (new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDay())).getTime();

      //测试节日
      var solarHoliday = {
        '0101': '元旦',
        '0214': '情人节',
        '0405': '清明',
        '0501': '劳动节',
        '1001': '国庆',
        '1225': '圣诞节',
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


      //要求必须要传入日期对象
      this.datamodel = {
        weekDayArr: ['日', '一', '二', '三', '四', '五', '六'],
        displayMonthNum: 5,
        curTime: t,
        year: dateObj.getFullYear(),
        month: dateObj.getMonth(),
        //分割月之间的显示
        MonthClapFn: function (year, month) {
          month = month + 1;
          return year + '年' + (month) + '月';
        },
        //具体显示项目定制化
        dayItemFn: function (year, month, day) {
          month = month + 1;
          month = _.dateUtil.formatNum(month);
          day = _.dateUtil.formatNum(day);
          if (solarHoliday[(month + '' + day)]) {
            return solarHoliday[(month + '' + day)];
          }
          return day;
        }
      };

      this.events = {
        'click .cui_calendar_item ': 'itemAction'
      };

      this.onItemClick = function (date, oldDay, e) {
        console.log(arguments);
      };

    },

    itemAction: function (e) {
      var el = $(e.currentTarget);
      var oldDay = el.hasClass('cui_cld_daypass');
      var date = el.attr('data-date');
      date = date.split('-');
      if (date.length != 3) return false;
      date = new Date(date[0], date[1], date[2]);

      if (this.onItemClick) this.onItemClick.call(this, date, oldDay, e);
    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    addEvent: function ($super) {
      $super();
    }

  });


});
