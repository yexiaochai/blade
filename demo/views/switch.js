define(['View', getViewTemplatePath('switch'), 'UISwitch'], function (View, viewhtml, UISwitch) {

    return _.inherit(View, {
        propertys: function ($super) {
            $super();
            this.template = viewhtml;

            this.addEvents({
                'click .js_demo01': 'demo01',
                'click .js_getStatus': 'getStatus'
            });
        },

        addEvent: function ($super) {
            $super();

            //在页面显示后做的事情
            this.on('onShow', function () {
                this._init();

            });

        },

        _init: function() {
            this.demo01();
        },

        getStatus: function() {
            var switch1_status = this.switch01.getStatus();

            $('.switch1_status').html(switch1_status)
            console.log(switch1_status);
        },

        demo01: function () {
            if (!this.switch01) {
                this.switch01 = new UISwitch({
                    wrapper: $('.switch1_wrap'),
                    changed: function(status) {
                        console.log(status, '重写 changed事件');
                    }

                });


            }

            this.switch01.show();
        }


    });

});
