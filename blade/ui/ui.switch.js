/*
与num组件一样，此类datamodel的方案是否会浪费资源，是否影响手机渲染，需要实际验证了
因为switch不太复杂，便抛弃完全render的做法
*/
define(['UIView', getAppUITemplatePath('ui.switch')], function (UIView, template) {

  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;

      this.datamodel = {
        checkedFlag: false
      };

      this.needRootWrapper = false;

      this.events = {
        'click': 'clickAction'
      };
    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    changed: function (status) {
      console.log(status);
    },

    checked: function () {
      if (typeof this.checkAvailabe == 'function' && !this.checkAvailabe()) {
        return;
      }

      if (this.getStatus()) return;
      this.$el.addClass('active');
      this.datamodel.checkedFlag = true;
      this._triggerChanged();
    },

    unChecked: function () {
      if (typeof this.checkAvailabe == 'function' && !this.checkAvailabe()) {
        return;
      }

      if (!this.getStatus()) return;
      this.$el.removeClass('active');
      this.datamodel.checkedFlag = false;
      this._triggerChanged();
    },

    _triggerChanged: function () {
      if (typeof this.changed == 'function') this.changed.call(this, this.getStatus());
    },

    //这里不以dom判断，以内置变量判断
    getStatus: function () {
      return this.datamodel.checkedFlag;
    },

    clickAction: function () {
      if (this.getStatus()) {
        this.unChecked();
      } else {
        this.checked();
      }
    },

    addEvent: function ($super) {
      $super();

      this.on('onShow', function () {
        _.flip(this.$el, 'left', $.proxy(function () {
          this.unChecked();
        }, this));

        _.flip(this.$el, 'right', $.proxy(function () {
          this.checked();
        }, this));

      });

      this.on('onHide', function () {
        _.flipDestroy(this.$el);
      });
    }

  });

});
