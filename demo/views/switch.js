define(['View', getViewTemplatePath('switch'), 'UISwitch'], function (View, viewhtml, UISwitch) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },

    events: {

    },

    onPreShow: function () {
      var scope = this;
      //简单switch
      if (!this.uiSwitch) {
        console.log('nima')
        this.uiSwitch = new UISwitch({
          wrapper: this.$el.find('.simple_switch'),
          changed: function (status) {
            scope.$('.demo1Status').html(status);
          }
        });
        this.uiSwitch.show();

        this.$('.demo1Status').html(this.uiSwitch.getStatus());

      }

      //设置默认值
      if (!this.uiSwitch1) {
        this.uiSwitch1 = new UISwitch({
          datamodel: {
            checkedFlag: true
          },
          wrapper: this.$el.find('.simple_switch1')
        });
        this.uiSwitch1.show();
      }

      //重写changed方法
      if (!this.uiSwitch2) {
        this.uiSwitch2 = new UISwitch({
          wrapper: this.$el.find('.simple_switch2'),
          changed: function (status) {
            console.log('i am status:', status);
          },
          checkAvailabe: function () {
            if (!scope.uiSwitch1.getStatus()) {
              return false;
            }
            return true;
          }
        });
        this.uiSwitch2.show();
      }

      this.turning();
    },

    onShow: function () {

    },

    onHide: function () {

    }

  });
});
