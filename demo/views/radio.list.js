define(['View', getViewTemplatePath('radio.list'), 'UIRadioList'], function (View, viewhtml, UIRadioList) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);

    },

    events: {
      'click .demo1': 'demo1',
      'click .demo2': 'demo2'
    },

    demo1: function () {
      console.log('demo1')
      if (!this.radio1) {
        var demodata1 =  [{ id:'华语'}, { id:'欧美'}, {id:'工作学习' }, {id:'粤语' },{id:'轻音乐' }, {id:'咖啡' }]
        this.radio1 = new UIRadioList({
          datamodel: {
            title: '豆瓣fm',
            data: demodata1
          }
        });
      }
      this.radio1.show();
    },

    demo2: function () {
      console.log('loading:2');
      if (!this.radio2) {
        this.radio2 = new UIRadioList({

        });
      }
      this.radio2.show();
    },

    onPreShow: function () {
      this.turning();
    },

    onShow: function () {

    },

    onHide: function () {

    }

  });
});
