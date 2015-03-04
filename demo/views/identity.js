define(['View', getViewTemplatePath('identity'), 'UIIdentitycard'], function (View, viewhtml, UIIdentitycard) {

    return _.inherit(View, {
        propertys: function ($super) {
            $super();
            this.template = viewhtml;

            this.addEvents({
                'click .js_demo01': 'demo01',
                'touchstart .js_demo01': 'demo01'
            });
        },

        demo01: function () {
            if (!this.identity01) {
                var $target01 = $('.identityCard');
                this.identity01 = new UIIdentitycard({
                    targetEl:$target01,
                    needMask:false,
                    itemClickAction: function(val) {
                        var curHtml = $target01.val();
                        $target01.val(curHtml + val);
                        console.log('item click action', val);
                    },
                    deleteAction: function() {
                        var curHtml = $target01.val();
                        if(curHtml.length > 0)
                        $target01.val(curHtml.substr(0,curHtml.length-1));
                    }

                });
            }

            this.identity01.show();
        }


    });

});
