define(['View', getViewTemplatePath('bubble_layer'), 'UIBubbleLayer'], function (View, viewhtml, UIBubbleLayer) {

    return _.inherit(View, {
        propertys: function ($super) {
            $super();
            this.template = viewhtml;

            this.addEvents({
                'click .js_demo01': 'demo01'
            });

        },

        demo01: function () {
            if (!this.bubble01) {
                this.bubble01 = new UIBubbleLayer({
                    content: 'two second close',
                    hideSec: 2000
                });
            }
            this.bubble01.show();
        }


    });

});
