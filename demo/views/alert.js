define(['View', getViewTemplatePath('alert'), 'UIAlert'], function (View, viewhtml, UIAlert) {

    return _.inherit(View, {
        propertys: function ($super) {
            $super();
            this.template = viewhtml;

            this.addEvents({
                'click .js_demo001': 'demo01',
                'click .js_demo02': 'demo02'
            });
        },

        demo01: function () {
            var txt = this.$('js_txt001').val();
            var n = new Date();
            var t = txt;
            var arrTime = t.split(',');
            var howLong = parseInt(arrTime[0]) * 3600 + parseInt(arrTime[1]) * 60 + parseInt(arrTime[2]);
            var theTime = new Date(n.getTime() + parseInt(howLong) * 1000);
            this.alert(theTime.toLocaleTimeString())
            
        },
        demo02: function () {
            if (!this.alert02) {
                this.alert02 = new UIAlert({
                    title: '购票须知',
                    content: '凭身份证可以通过',
                    btns: [
                        { name: '知道了', className: 'cui-btns-ok' },
                        { name: '不知道', className: 'cui-btns-no' },
                        { name: '未知', className: 'cui-btns-unknown' }
                    ],

                    events: {
                        'click .cui-btns-ok': 'okAction',
                        'click .cui-btns-no': 'noAction',
                        'click .cui-btns-unknown': 'unknownAction'
                    },
                    okAction: function () {
                        alert('这里可以执行ok callback');
                        this.hide();
                    },
                    noAction: function () {
                        alert('这里可以执行no ok callback');
                        this.hide();
                    },
                    unknownAction: function () {
                        alert('这里可以执行unknow callback');
                        this.hide();
                    }
                });
            }

            this.alert02.show();
        }

    });

});
