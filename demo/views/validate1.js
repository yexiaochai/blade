define(['View', getViewTemplatePath('validate1'), 'cValidate'], function (View, viewhtml, cValidate) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },

    events: {
      'click .demo1': 'demo1'
    },

    demo1: function () {
      try {
        console.clear();  //清空console里的内容
      } catch (e) { }

      //获取form下所有要验证的input
      var $inputs = $('.validate-form  .va-input');
      var num = [];  //验证是否重复数字
      this.$('.error_info').detach(); // 清空所有气泡提示
      //遍历所有要验证的input
      for (var i = 0, len = $inputs.length; i < len; i++) {
        //取验证的类型
        var val_type = $inputs.eq(i).attr('val-type');
        //重复数字验证
        if (val_type == 'isAllowSetTradingPass') {
          num[$inputs.eq(i).attr('num')] = $inputs.eq(i).val();
          if (num.length == 2) {
            //console.log(num);
            cValidate.isAllowSetTradingPass(num) ? console.log('重复数字: is true') : console.error('重复数字: is false');
          }
          continue;
        }
        //验证input里的值是否符合该类型的验证条件
        var isTrue = cValidate[val_type]($inputs.eq(i).val());
        //输出验证信息
        if (isTrue) {
          console.log($inputs.eq(i).prev('label').html() + ' is true');
        } else {
          //创建错误提示气泡
          var error_info = document.createElement('div');
          error_info.innerHTML = $inputs.eq(i).prev('label').html() + '不正确';
          error_info.style.cssText = 'position:absolute;top:' + ($inputs.eq(i).position().top - 10) + 'px;left:' + ($inputs.eq(i).position().left + 160) + 'px;';
          error_info.className = 'error_info';
          $inputs.eq(i).after(error_info);

          console.log($inputs.eq(i).prev('label').html() + ' is false');
        }
      }
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
