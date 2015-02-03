/*
与num组件一样，此类datamodel的方案是否会浪费资源，是否影响手机渲染，需要实际验证了
因为switch不太复杂，便抛弃完全render的做法
*/
define(['UIView', 'text!T_UISwitch', 'text!C_UISwitch'], function (UIView, template, style) {

  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;
      this.addUIStyle(style);
      this.openShadowDom = false;

      this.checkedFlag = false;

      //选择的标识
      this.checkedClass = 'active';

    },

    getViewModel: function () {
      return this._getDefaultViewModel(['checkedFlag']);
    },


    initElement: function () {
      this.el = this.$('.js_switch');
    },

    checked: function () {
      if (typeof this.checkAvailabe == 'function' && !this.checkAvailabe()) {
        return;
      }
      if (this.getStatus()) return;
      this.el.addClass(this.checkedClass);
      this.checkedFlag = true;
      this._triggerChanged();
    },

    unChecked: function () {
      if (typeof this.checkAvailabe == 'function' && !this.checkAvailabe()) {
        return;
      }
      if (!this.getStatus()) return;
      this.el.removeClass(this.checkedClass);
      this.checkedFlag = false;
      this._triggerChanged();
    },

    _triggerChanged: function () {
      if (typeof this.changed == 'function') this.changed.call(this, this.getStatus());
    },

    changed: function (status) {
      console.log(status);
    },

    //这里不以dom判断，以内置变量判断
    getStatus: function () {
      return this.checkedFlag;
    },

    addEvent: function ($super) {
      $super();

      this.on('onShow', function () {

        this.$root.css('display', 'inline-block');

        //******bug******
        //这里的flip本身有BUG未修复，后期需要修复
        _.flip(this.$el, 'left', $.proxy(function () {
          this.unChecked();
        }, this));

        _.flip(this.$el, 'right', $.proxy(function () {
          this.checked();
        }, this));

        _.flip(this.$el, 'tap', $.proxy(function () {
          if (this.getStatus()) {
            this.unChecked();
          } else {
            this.checked();
          }
          return;
        }, this));
      });

      this.on('onHide', function () {
        _.flipDestroy(this.$el);
      });
    }

  });


});
