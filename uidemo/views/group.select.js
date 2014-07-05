define(['View', getViewTemplatePath('group.select'), 'UIGroupSelect'], function (View, viewhtml, UIGroupSelect) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);

    },

    events: {
      'click .demo1': function () {
        var data1 = [];
        var data2 = [];

        for (var i = 0; i < 10; i++) {
          var obj = { id: 'q_' + i, name: '项目_' + i };
          if (i % 3 == 0) obj.disabled = true;
          data1.push(obj);
        }

        for (var i = 0; i < 10; i++) {
          var obj = { id: 'qqq_' + i, name: '项目_' + i };
          if (i % 4 == 0) obj.disabled = true;
          data2.push(obj);
        }



        if (!this.s) {
          this.s = new UIGroupSelect({
            data: [data1, data2]

          });
        }
        this.s.show();



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
