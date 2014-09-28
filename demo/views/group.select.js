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
            data: [data1, data2],
            onOkAction: function (items) {
              console.log('ok', items);
              this.hide();
            },
            onCancelAction: function () {
              console.log('cancel');
              this.hide();
            }
          });
        }
        this.groupSelect.show();
      },

      'click .demo2': function () {
        var data1 = [], data2 = [], data3 = [];
        //对应月份的最大天数
        var dayFlag = { 1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31 };

        for (var i = 2000; i <= 2014; i++) {
          var obj = { id: 'y_' + i, name: i + '年' };
          data1.push(obj);
        }

        for (var i = 1; i <= 12; i++) {
          var obj = { id: 'm_' + i, name: i + '月' };
          data2.push(obj);
        }

        for (var i = 1; i <= 31; i++) {
          var obj = { id: 'd_' + i, name: i + '日' };
          data3.push(obj);
        }

        if (!this.groupSelect2) {
          this.groupSelect2 = new UIGroupSelect({
            datamodel: {
              title: '日期选择',
              tips: ''
            },
            data: [data1, data2, data3],
            changedArr: [function (item) {
              console.log('my year:', item);
              this.scrollArr[1].reload();

            }, function (item) {
              var d = this.scrollArr[2],           //获取日select组件
                   item_m = parseInt(item.name),      //获取当前选中的月
                   tmp = dayFlag[item_m];

              for (var i = 31; i > 28; i--) {
                //重置可选
                d.datamodel.data[i - 1].disabled = false;
                //如果当月最大日数小于i，则为不可选
                if (i > tmp) d.datamodel.data[i - 1].disabled = true;
              }
              //重绘数据模型
              this.scrollArr[2].reload();
              console.log('my month:', item);
            }, function (item) {
              console.log('my day:', item);
            } ],
            //
            onOkAction: function (item) {
              console.log('my okAction', item);
              this.hide();
            },
            onCancelAction: function (item) {
              console.log('my cancelAction', item);
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
