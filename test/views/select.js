define(['View', 'UISelect', getViewTemplatePath('select')], function (View, UISelect, viewhtml) {

  return _.inherit(View, {
    onCreate: function () {
      console.log('onCreate');
      this.$el.html(viewhtml);
      this.select = null;
      this.select1 = null;
    },

    events: {
      'click .widget0': function (e) {
        if(!this.select) {
          this.select = new UISelect({
            wrapper: this.$el.find('.wrapper0')
          });
          this.select.show();
        } else {
          this.select.show();
        }

      },
      'click .widget1': function (e) {
        //参数设置
        if(!this.select1) {
          var demoData = [];
          for(var i=0;i<10;i++) {
            demoData.push({id:i, name:'数据'+i})
          }
          this.select1 = new UISelect({
            wrapper: this.$el.find('.wrapper1'),
            datamodel: {
              data: demoData,
              index: 6
            }
          });
          this.select1.show();
        } else {
          this.select1.show();
        }
      },

      'click .back': function () {
        this.back('index');
      }
    },

    onPreShow: function () {
      console.log('onPreShow');
      //简单实例化




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
