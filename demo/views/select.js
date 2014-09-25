define(['View', getViewTemplatePath('select'), 'UISelect'], function (View, viewhtml, UISelect) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);

    },

    events: {
      'focus .chooseDate': 'chooseDateAction',
      'click .sconfirm': 'confirmAction',
      'click .scancel': 'cancelAction'
    },

    cancelAction: function () {
      this.$('.date-widget').addClass('back').removeClass('move');
    },

    confirmAction: function () {
      this.$('.date-widget').addClass('back').removeClass('move');

      this.$('.chooseDate').val(this.demo1.getSelected().name + this.demo2.getSelected().name + this.demo3.getSelected().name)
    },

    chooseDateAction: function () {

      if (!this.demo1 || !this.demo2 || !this.demo3) {
        var dayFlag = { 1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31 };
        var data1 = [], data2 = [], data3 = [], scope = this;
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

        this.demo1 = new UISelect({
          wrapper: this.$('.row1'),
          datamodel: {
            data: data1
          },
          changed: function (item) {
            this.item = item;
          }
        });

        this.demo2 = new UISelect({
          wrapper: this.$('.row2'),
          datamodel: {
            data: data2
          },
          changed: function (item) {
            var curMonth = parseInt(item.name);
            var maxDay = dayFlag[curMonth];

            for (var i = 31; i > 28; i--) {
              scope.demo3.datamodel.data[i - 1].disabled = false;
              if (i > maxDay) {
                scope.demo3.datamodel.data[i - 1].disabled = true;
              }
            }
            scope.demo3.reload()
          }
        });

        this.demo3 = new UISelect({
          wrapper: this.$('.row3'),
          datamodel: {
            data: data3
          }
        });

      }

      this.demo1.show();
      this.demo2.show();
      this.demo3.show();

      //出场动画
      this.$('.date-widget').addClass('move').removeClass('back');
    },

    _initDemo1: function () {

      if (this.demo1) return;
      //这里若是demo1有显示状态什么的需要注意资源释放
      var scope = this, curItem;
      var demo1Sec = scope.$('.demo1Sec');
      this.demo1 = new UISelect({
        datamodel: {
          data: [
            { id: 1, name: '中国' }, { id: 2, name: '美国' }, { id: 3, name: '英国' }
          ]
        },
        displayNum: 3,
        changed: function (item) {
          demo1Sec.html(item.id + ': ' + item.name);
        },
        wrapper: this.$('.demo1')
      });

      this.demo1.show();

      curItem = this.demo1.getSelected();
      demo1Sec.html(curItem.id + ': ' + curItem.name);

    },

    _initDemo2: function () {
      if (this.month) return;

      var m = [], d = [], md = this.$('.md'), i, fn, scope = this;
      var dayFlag = { 1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31 };

      for (i = 0; i < 31; i++) {
        var id = i + 1;
        if (i < 12) {
          m.push({ id: id, name: id + '月' });
        }
        d.push({ id: id, name: id + '日' });
      }

      fn = function (item) {
        md.val(scope.month.getSelected().name + scope.day.getSelected().name);
        md.attr('data-month', scope.month.getSelected().id);
        md.attr('data-day', scope.day.getSelected().id);
      };

      this.month = new UISelect({
        datamodel: {
          data: m
        },
        displayNum: 3,
        changed: function (item) {
        },
        wrapper: this.$('.month'),
        changed: function (item) {
          var m = item.id, i, index, tmp = dayFlag[m];
          for (i = 31; i > 28; i--) {
            index = i - 1;
            scope.day.datamodel.data[index].disabled = false;
            if (i > tmp) {
              scope.day.datamodel.data[index].disabled = true;
            }
          }
          scope.day.reload();
          fn();
        }
      });

      this.day = new UISelect({
        datamodel: {
          data: d
        },
        displayNum: 3,
        changed: function (item) {
        },
        wrapper: this.$('.day'),
        changed: fn
      });

      this.month.show();
      this.day.show();
      fn();

    },

    onPreShow: function () {


      this.turning();
    },

    onShow: function () {
      this._initDemo1();
      this._initDemo2();
    },

    onHide: function () {

    }

  });
});
