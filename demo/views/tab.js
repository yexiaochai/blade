define(['View', getViewTemplatePath('tab'), 'UITab'], function (View, viewhtml, UITab) {

    return _.inherit(View, {
        propertys: function ($super) {
            $super();
            this.template = viewhtml;

            this.addEvents({
                'click .js_demo01': 'demo01',
                'click .js_tab_index': 'getTabIndex'
            });
        },

        getTabIndex: function() {
            var tabIndex = this.tab02.getVal()
            $('.get-tab-index').html(tabIndex);
            console.log(tabIndex);
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
            this.demo02();

            //定位到选项2
            this.tab02.setVal(2);
        },

        demo01: function () {
            if (!this.tab01) {
                this.tab01 = new UITab({
                    wrapper: $('.tab1-wrap'),
                    data: [{
                        id:1,
                        name: '好评'
                    },
                    {
                        id:2,
                        name: '中评'
                    },
                    {
                        id:3,
                        name: '差评'
                    }]

                });

            }

            this.tab01.show();
        },

        demo02: function () {
            if (!this.tab02) {
                this.tab02 = new UITab({
                    wrapper: $('.tab2-wrap'),
                    data: [{
                        id:1,
                        name: '好评'
                    },
                        {
                            id:2,
                            name: '中评'
                        },
                        {
                            id:3,
                            name: '差评'
                        }],

                    onChange: function() {
                        console.log('onChange callback');
                    }


                });

            }

            this.tab02.show();
        }


    });



});
