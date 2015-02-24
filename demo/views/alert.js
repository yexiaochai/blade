define(['View', getViewTemplatePath('alert'), 'UIAlert'], function (View, viewhtml, UIAlert) {

    return _.inherit(View, {
        propertys: function ($super) {
            $super();
            this.template = viewhtml;

            this.addEvents({
                'click .js_demo01': 'demo01',
                'click .js_demo02': 'demo02'
            });
        },

        demo01: function () {
            if (!this.alert01) {
                this.alert01 = new UIAlert({
                    title: '购票须知',
                    content: '凭身份证可以通过',
                    btns: [
                        { name: '知道了', className: 'cui-btns-ok' }
                    ],
                    events: {
                        'click .cui-btns-ok': 'okAction'
                    },
                    okAction: function () {
                        alert('这里可以执行callback');
                        this.hide();
                    }
                });
            }

            this.alert01.show();
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
