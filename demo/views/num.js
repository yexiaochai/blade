define(['View', getViewTemplatePath('num'), 'UINum'], function (View, viewhtml, UINum) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);

    },

    events: {

    },

    onPreShow: function () {
      //简单num,防止重复实例化
      if (!this.num) {
        this.num = new UINum({
          //把组件放入指定容器，不知道这样对不对。
          wrapper: this.$el.find('.simple_num')
        });
        this.num.show();
      }

      //分别设置min、max、单位、是否可以input输入值
      if (!this.num1) {
        this.num1 = new UINum({
          datamodel: {
            min: 2,
            max: 6,
            curNum: 1,  //默认值，小于min会自动设置为min值
            unit: '只',
            needText: false
          },
          //把组件放入指定容器，不知道这样对不对。
          wrapper: this.$el.find('.simple_num1')
        });
        this.num1.show();
      }

      //设置add和minus class
      if (!this.num2) {
        this.num2 = new UINum({
          datamodel: {
            addClass: 'me_num-add',
            minusClass: 'me_num-minus',
            curClass: 'me_num-value-txt'
          },
          events: {
            'click .me_num-add': 'addAction',
            'click .me_num-minus': 'minusAction',
            'focus .me_num-value-txt': 'txtFocus',
            'blur .me_num-value-txt': 'txtBlur'
          },
          addAction: function () {
            this.setVal(this.datamodel.curNum + 2);
            console.log('me addAction');
          },
          minusAction: function () {
            this.setVal(this.datamodel.curNum - 2);
            console.log('me minusAction');
          },
          txtFocus: function () {
            this.curNum.val('');
          },
          txtBlur: function () {
            this.setVal(this.curNum.val());
          },
          initElement: function () {
            this.curNum = this.$('.me_num-value-txt');
          },
          //把组件放入指定容器，不知道这样对不对。
          wrapper: this.$el.find('.simple_num2')
        });
        this.num2.show();
      }

      //重写change事件,还可以重写其它
      if (!this.num3) {
        this.num3 = new UINum({
          changed: function (num) {
            console.log('i am change' + num);
          },
          //把组件放入指定容器，不知道这样对不对。
          wrapper: this.$el.find('.simple_num3')
        });
        this.num3.show();
      }

      if (!this.num4) {
        var scope = this;
        this.num4 = new UINum({
          availableFn: function () {
            if (scope.num3.getVal() == 5) return true;

            alert('需要上一个组件为5才可选');
            return false;
          },
          wrapper: this.$el.find('.simple_num4')
        });
        this.num4.show();
      }

      this.turning();
    },

    onShow: function () {

      var s = '';
    },

    onHide: function () {

    }

  });
});
