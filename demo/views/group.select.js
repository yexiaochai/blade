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

        if (!this.groupSelect) {
          this.groupSelect = new UIGroupSelect({
            data: [data1, data2]
          });
        }
        this.groupSelect.show();
      },

      'click .demo2': function () {
        var data1 = [], data2 = [], data3 = [];

        for (var i = 2000; i <= 2014; i++) {
          var obj = { id: 'y_' + i, name:  i + '年' };
          data1.push(obj);
        }

        for (var i = 1; i <= 12; i++) {
          var obj = { id: 'm_' + i, name: i + '月' };
          data2.push(obj);
        }

        for (var i = 1; i <= 31; i++) {
          var obj = { id: 'd_' + i, name: i + '日'};
          data3.push(obj);
        }

        if (!this.groupSelect2) {
          this.groupSelect2 = new UIGroupSelect({
            datamodel: {
              title: '日期选择',
              tips: ''
            },
            data: [data1, data2, data3],
            changedArr: [function(item) {
              console.log('overwrite:', item);
            }, function(item) {
              console.log('overwrite:', item);
            },function(item) {
              console.log('overwrite:', item);
            }],
            onOkAction: function(item) {
              console.log('overwrite okAction', item);
              this.hide();
            },
            onCancelAction: function(item) {
              console.log('overwrite cancelAction', item);
              this.hide();
            }
          });
        }
        this.groupSelect2.show();
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
