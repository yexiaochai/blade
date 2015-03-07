define(['View', getViewTemplatePath('num'), 'UINum'], function (View, viewhtml, UINum) {

    return _.inherit(View, {
        propertys: function ($super) {
            $super();
            this.template = viewhtml;

            this.addEvents({
                'click .js_demo01': 'demo01',
                'click .js_demo02': 'demo02'
            });
        },
        addEvent: function ($super) {
            $super();

            //在页面显示后做的事情
            this.on('onPreShow', function () {

            });

            this.on('onCreate', function () {

            });

            this.on('onShow', function () {
                this.demo01();
                this.demo02();
            });

        },

        demo01: function () {
            if (!this.num01) {
                this.num01 = new UINum({
                    wrapper: $('.numWrap'),
                    min: 2,
                    max: 6,
                    curNum: 1,  //默认值，小于min会自动设置为min值
                    unit: '个',
                    needText: false

                });
            }

            this.num01.show();
        },

        demo02: function() {
            //设置add和minus class
            if (!this.num02) {
                this.num02 = new UINum({
                    //把组件放入指定容器，不知道这样对不对。
                    wrapper: this.$el.find('.numWrap2'),

                    addAction: function () {
                        this.setVal(this.curNum + 2);
                        console.log('me addAction');
                    },
                    minusAction: function () {
                        this.setVal(this.curNum - 2);
                        console.log('me minusAction');
                    },
                    txtFocus: function () {
                        this.curNum.val('');
                    },
                    txtBlur: function () {
                        this.setVal(this.curNum.val());
                    }

                });
                this.num02.show();
            }
        }






    });

});
