
define(['UIView', getAppUITemplatePath('ui.calendar')], function (UIView, template) {


  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;

      this.dateObj = new Date();

      //要求必须要传入日期对象
      this.datamodel = {
        scope: this,
        weekDayArr: ['日', '一', '二', '三', '四', '五', '六'],
        displayMonthNum: 5,
        curTime: (new Date(this.dateObj.getFullYear(), this.dateObj.getMonth(), this.dateObj.getDate())).getTime(),
        //分割月之间的显示
        MonthClapFn: function (year, month) {
          month = month + 1;
          return year + '年' + (month) + '月';
        },
        //具体显示项目定制化
        dayItemFn: function (year, month, day, dateObj, difftime) {
          if (difftime == 0) day = '今天';
          return day;
        }
      };

      this.events = {
        'click .cui_calendar_item ': 'itemAction'
      };

      this.onItemClick = function (date, el, e) {
        console.log(arguments);
      };

    },

    //要求唯一标识，根据id确定index
    resetPropery: function () {
      this.datamodel.year = this.dateObj.getFullYear();
      this.datamodel.month = this.dateObj.getMonth();

    },

    itemAction: function (e) {
      var el = $(e.currentTarget);
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
