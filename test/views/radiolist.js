define(['View', 'UIRadioList', getViewTemplatePath('radiolist')], function (View, UIRadioList, viewhtml) {

  return _.inherit(View, {
    onCreate: function () {
      console.log('onCreate');
      this.$el.html(viewhtml);
      this.radiolist = null;
      this.radiolist1 = null;
    },

    events: {
      'click .widget0': function (e) {
        //简单实例化
        if(!this.radiolist) {
          this.radiolist = new UIRadioList();
          this.radiolist.show();
        } else {
          this.radiolist.show();
        }

      },
      'click .widget1': function (e) {
        //设置参数，重写click事件
        if(!this.radiolist1) {
          this.radiolist1 = new UIRadioList({
            datamodel: {
              title: 'radio list',
              data: [{ id:'烟火'}, { id:'不见'}, {id:'纪念' }, {id:'钟无艳' },{id:'富士山下' }, {id:'十年之后' }],
              index:2
            },
            onClick: function(e, data) {
              console.log('overwrite :', data);
            }
          });
          this.radiolist1.show();
        } else {
          this.radiolist1.show();
        }
      },

      'click .back': function () {
        this.back('index');
      }
    },

    onPreShow: function () {
      console.log('onPreShow');

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
