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
          data: [
            { name: '价格/星级' },
            { name: '位置区域' },
            { name: '品牌' },
            { name: '测试' }
          ],
          needMask: false,
          width: 300,
          triggerEl: this.$('.js_demo01'),
          onClick: function (data, index, el) {
            console.log(arguments);
            this.setIndex(index);
            this.hide();
          }

        });
      }
      this.bubble01.show();
    }


  });

});
