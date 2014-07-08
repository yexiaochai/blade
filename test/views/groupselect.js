define(['View', 'UIGroupSelect', getViewTemplatePath('groupselect')], function (View, UIGroupSelect, viewhtml) {

  return _.inherit(View, {
    onCreate: function () {
      console.log('onCreate');
      this.$el.html(viewhtml);
      this.groupselect = null;
      this.groupselect1 = null;
    },

    events: {
      //简单初始化
      'click .widget0': function (e) {
        if(!this.groupselect) {
          this.groupselect = new UIGroupSelect();
          this.groupselect.show();
        } else {
          this.groupselect.show();
        }
      },

      //设置参数
      'click .widget1': function (e) {
        if(!this.groupselect1) {

          var demodata1 = [],
              demodata2 = [],
              demodata3 = [];

          for(var i=0;i<10;i++) {
            demodata1.push({ id: 'row_' +i ,name: '第一列'+i })
          }

          for(var i=0;i<5;i++) {
            demodata2.push({ id: 'row_' +i ,name: '元素'+i })
          }

          for(var i=0;i<20;i++) {
            demodata3.push({ id: 'row_' +i ,name: '元素'+i })
          }

          this.groupselect1 = new UIGroupSelect({
            data:[demodata1, demodata2, demodata3]
          });
          this.groupselect1.show();
        } else {
          this.groupselect1.show();
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
