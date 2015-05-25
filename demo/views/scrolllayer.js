define(['View', getViewTemplatePath('scrolllayer'), 'UIScrollLayer'], function (View, viewhtml, UIScrollLayer) {

    return _.inherit(View, {
        propertys: function ($super) {
            $super();
            this.template = viewhtml;

            this.addEvents({
                'click .js_demo01': 'demo01'

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


        demo01: function () {
            if (!this.demo_1) {
                this.demo_1 = new UIScrollLayer({
                    wrapper: $('.demo1_wrap'),
                    data: [
                        { id: 1, name: '中国' }, { id: 2, name: '美国' }, { id: 3, name: '英国' }
                    ]

                });


            }

            this.demo_1.show();
        }


    });

});
