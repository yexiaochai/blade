define(['AbstractView', getViewTemplatePath('index')], function (View, viewhtml) {
  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
      this.msg = this.$('.msg');

      console.log('大家好，我是omCreate事件，我会执行并且只会执行一次');
      this.msg.append($('<div>大家好，我是omCreate事件，我会执行并且只会执行一次</div>'));
    },

    events: {
      'click h2': function (e) {
        this.forward('list');
      },
      'click .icon_home': function () {
        window.location = '../index.html';
      }
    },

    onPreShow: function () {
      console.log('大家好，我是onPreShow事件，我每次都会执行，执行最后执行turning方法便可显示view');
      this.msg.append($('<div>大家好，我是onPreShow事件，我每次都会执行，执行最后执行turning方法便可显示view</div>'));

      this.turning();
    },

    onShow: function () {
      console.log('大家好，我是onShow事件，我在onPreShow执行turning后会执行');
      this.msg.append($('<div>大家好，我是onShow事件，我在onPreShow执行turning后会执行</div>'));


//      _.setInterval(function () {
//        console.log('111')
//      }, 1000, 'sss');

      _.setInterval(function () {
        console.log('222')
      }, 1000);

      _.setInterval(function () {
        console.log('333')
      }, 1000);

    },

    onHide: function () {
      console.log('大家好，我是onHide事件，每次切换我将隐藏时候我会触发');
      this.msg.append($('<div>大家好，我是onHide事件，每次切换我将隐藏时候我会触发<hr/></div>'));

    }

  });
});
