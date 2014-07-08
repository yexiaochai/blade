define(['View', 'UIMask', getViewTemplatePath('mask')], function (View, UIMask, viewhtml) {

  return _.inherit(View, {
    onCreate: function () {
      console.log('onCreate');
      this.$el.html(viewhtml);
    },

    events: {
      'click .widget0': function (e) {
        var mask = new UIMask();
        mask.show();

        //mask显示之前为mask绑定关闭事件，一次执行便不予理睬了
        mask.$el.on('click.uimask' + mask.id, function () {
          mask.hide();
        });
      },

      'click .back': function () {
        this.back('index');
      }
    },

    onPreShow: function () {
      console.log('onPreShow');

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
