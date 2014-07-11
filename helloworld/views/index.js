define(['AbstractView', getViewTemplatePath('index')], function (View, viewhtml) {




  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
      console.log('大家好，我是omCreate事件，我会执行并且只会执行一次');
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
      this.turning();
    },

    onShow: function () {
      console.log('大家好，我是onShow事件，我在onPreShow执行turning后会执行');

    },

    onHide: function () {
      console.log('大家好，我是onHide事件，每次切换我将隐藏时候我会触发');
    }

  });
});
