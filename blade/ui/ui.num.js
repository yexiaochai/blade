/*
这里需要考虑这个方案是否值得
每一次数据的改变皆会引发dom 的重组事件的解绑与绑定，datamodel方案是否真的就是好？
*/
define(['UIView', 'text!T_UINum', 'text!C_UINum'], function (UIView, template, style) {

  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();
      this.template = template;
      this.addUIStyle(style);

      this.min = 1;
      this.max = 9;
      this.curNum = 1;
      this.unit = '';
      this.needText = false;

      this.events = {
        'click .js_num_minus': 'minusAction',
        'click .js_num_plus': 'addAction',
        'focus .js_cur_num': 'txtFocus',
        'blur .js_cur_num': 'txtBlur'
      };

      this.needRootWrapper = false;

    },

    getViewModel: function () {
      return this._getDefaultViewModel(['min', 'max', 'curNum', 'unit', 'needText']);
    },

    initElement: function () {
      this.$curNum = this.$('.js_cur_num');
    },

    txtFocus: function () {
      this.$curNum.html('');
    },

    txtBlur: function () {
      this.setVal(this.$curNum.html());
    },

    addAction: function () {
      this.setVal(this.curNum + 1);
    },

    minusAction: function () {
      this.setVal(this.curNum - 1);
    },

    //用于重写
    changed: function (num) {
      console.log('num changed ' + num);
    },

    getVal: function () {
      return this.curNum;
    },

    setVal: function (v) {
      var isChange = true;
      var tmp = this.curNum;
      if (v === '') v = tmp;
      if (v == parseInt(v)) {
        //设置值不等的时候才触发reset
        v = parseInt(v);
        this.curNum = v;
        if (v < this.min) {
          this.curNum = this.min;
        }
        if (v > this.max) {
          this.curNum = this.max;
        }
        this.$curNum.val(this.curNum);
        isChange = (this.curNum != tmp);
      }

      this.resetNum(isChange);

    },

    //重置当前值，由于数值不满足条件
    resetNum: function (isChange) {
      this.refresh();
      if (isChange) this.changed.call(this, this.curNum);
    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    //这里需要做数据验证
    resetPropery: function ($super) {
      $super();
      if (this.curNum > this.max) {
        this.curNum = this.max;
      } else if (this.curNum < this.min) {
        this.curNum = this.min;
      }
    },

    addEvent: function ($super) {
      $super();
      this.on('onShow', function () {
        this.$root.css('display', 'inline-block');
      });
    }

  });


});
