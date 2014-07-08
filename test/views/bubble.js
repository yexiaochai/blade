define(['View', 'UIBubbleLayer', getViewTemplatePath('bubble')], function (View, UIBubbleLayer, viewhtml) {

  return _.inherit(View, {
    onCreate: function () {
      console.log('onCreate');
      this.$el.html(viewhtml);
      this.bubble = null;
      this.bubble1 = null;
    },

    events: {
      'click .widget0': function (e) {

      },

      'click .back': function () {
        this.back('index');
      }
    },

    onPreShow: function () {
      console.log('onPreShow');

      //简单应用
      if(!this.bubble) {
        this.bubble = new UIBubbleLayer({
          datamodel: {
            dir: ''
          },
          wrapper: this.$el.find('.simple_bubble')
        });
        this.bubble.show();
      }

      //设置参数
      if(!this.bubble1) {
        this.bubble1 = new UIBubbleLayer({
          datamodel: {
            dir: 'up',  //箭头方向
            data: [     //data数据
              { name: '二星级' },
              { name: '三星级' },
              { name: '四星级' },
              { name: '<span>五星级</span>' }
            ],
            upClass: 'f-layer-before',
            downClass: 'f-layer-after',
            curClass: 'cui-fl-current',
            index: 2   //z-index
          },
          wrapper: this.$el.find('.simple_bubble1')
        });
        this.bubble1.show();
      }

      //动态设置index
      setTimeout(function() {
        this.bubble1.setIndex(0);
      }.bind(this), 2000);


      this.turning();
    },

    onAfterShow: function () {
      console.log('onAfterShow');
    },

    onHide: function () {
      console.log('onHide');
    }

  });
});
