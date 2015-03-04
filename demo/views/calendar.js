define(['View', getViewTemplatePath('calendar'), 'UICalendar'], function (View, viewhtml, UICalendar) {

    return _.inherit(View, {
        propertys: function ($super) {
            $super();
            this.template = viewhtml;

            this.addEvents({
                'click .js_demo01': 'demo01'
            });

        },

        demo01: function () {
            if (!this.calendar01) {
                this.calendar01 = new UICalendar({
                    wrapper: $('.cal_wrap'),
                    displayMonthNum: 2,  //跨多小个月份
                    startTime: new Date('2015/04/10'),  //开始日期
                    endTime: new Date('2015/10/07')     //结束日期

                });
            }
            this.calendar01.show();
        }


    });

});
