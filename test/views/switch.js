define(['View', 'UISwitch', getViewTemplatePath('switch')], function (View, UISwitch, viewhtml) {

  return _.inherit(View, {
    onCreate: function () {
      console.log('onCreate');
      this.$el.html(viewhtml);
      this.uiSwitch = null;
      this.uiSwitch1 = null;
      this.uiSwitch2 = null;
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

      //简单switch
      if(!this.uiSwitch) {
        console.log('nima')
        this.uiSwitch = new UISwitch({
          wrapper:this.$el.find('.simple_switch')
        });
        this.uiSwitch.show();
      }

      //设置默认值
      if(!this.uiSwitch1) {
        this.uiSwitch1 = new UISwitch({
          datamodel: {
            checkedFlag: true
          },
          wrapper:this.$el.find('.simple_switch1')
        });
        this.uiSwitch1.show();
      }

      //重写changed方法
      if(!this.uiSwitch2) {
        this.uiSwitch2 = new UISwitch({
          wrapper:this.$el.find('.simple_switch2'),
          changed: function(status) {
            console.log('i am status:', status);
          }
        });
        this.uiSwitch2.show();
      }


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
