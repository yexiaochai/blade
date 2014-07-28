define(['AbstractView', getViewTemplatePath('list')], function (View, viewhtml) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
      this.msg = this.$('.msg');
      console.log('大家好，我是list的onCreate事件，我会执行并且只会执行一次');
      this.msg.append($('<div>大家好，我是list的omCreate事件，我会执行并且只会执行一次</div>'));

    },

    events: {
      'click h2': function (e) {
        this.back('index');
      },
      'click .icon_home': function () {
        window.location = '../index.html';
      }
    },

    onPreShow: function () {
      console.log('大家好，我是list的onPreShow事件，我每次都会执行，执行最后执行turning方法便可显示view');
      this.msg.append($('<div>大家好，我是list的onPreShow事件，我每次都会执行，执行最后执行turning方法便可显示view</div>'));

      this.turning();
      _.clearInterval();
    },

    onAfterShow: function () {
      console.log('大家好，我是list的onShow事件，我在onPreShow执行turning后会执行');

      this.msg.append($('<div>大家好，我是list的onShow事件，我在onPreShow执行turning后会执行</div>'));

    },

    onHide: function () {
      console.log('大家好，我是list的onHide事件，每次切换我将隐藏时候我会触发');
      this.msg.append($('<div>大家好，我是list的onHide事件，每次切换我将隐藏时候我会触发<hr/></div>'));

    }

  });
});
