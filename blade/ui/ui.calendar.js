
define(['UIView', getAppUITemplatePath('ui.calendar')], function (UIView, template) {


  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;

      var dateObj = new Date();
      var curTime = (new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDay())).getTime();

      //要求必须要传入日期对象
      this.datamodel = {
        weekDayArr: ['日', '一', '二', '三', '四', '五', '六'],
        displayMonthNum: 5,
        curTime: curTime,
        year: dateObj.getFullYear(),
        month: dateObj.getMonth(),
        //分割月之间的显示
        MonthClapFn: function (year, month) {
          month = month + 1;
          return year + '年' + (month) + '月';
        },
        //具体显示项目定制化
        dayItemFn: function (year, month, day) {
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

    initElement: function () {
      this.weekDay = this.$('.cui_cldweek');
    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    addEvent: function ($super) {
      $super();
    }

  });


});
