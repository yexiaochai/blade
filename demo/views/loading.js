define(['View', getViewTemplatePath('loading'), 'UILoadingLayer'], function (View, viewhtml, UILoadingLayer) {

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
            if (!this.loading1) {
                this.loading1 = new UILoadingLayer();
            }
            this.loading1.show();

            //2秒后自动隐藏
            setTimeout(function () {
                this.loading1.hide();
            }.bind(this), 2000);
        },

        demo02: function() {
            if (!this.loading2) {
                this.loading2 = new UILoadingLayer({
                    content: 'two second close',
                    closeBtn: true,
                    maskToHide: true

                });
            }
            this.loading2.show();

            //2秒后自动隐藏
            setTimeout(function () {
                this.loading2.hide();
            }.bind(this), 2000);
        }


    });

});
