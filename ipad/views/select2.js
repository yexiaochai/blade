define(['View', getViewTemplatePath('select2'), 'UISelect'], function (View, viewhtml, UISelect) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);

    },

    events: {
      'focus .chooseDate': 'chooseDateAction',
      'click .sconfirm': 'confirmAction',
      'click .scancel': 'cancelAction'
    },
    cancelAction: function(){
      this.$('.date-widget').addClass('back').removeClass('move');
    },

    confirmAction: function() {
      this.$('.date-widget').addClass('back').removeClass('move');

      this.$('.chooseDate').val(this.demo1.getSelected().name +this.demo2.getSelected().name + this.demo3.getSelected().name)
    },

    chooseDateAction: function() {

      if (!this.demo1 || !this.demo2 || !this.demo3) {
        var dayFlag = { 1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31 };
        var data1 = [], data2 = [], data3 = [], scope = this;
        for (var i = 2000; i <= 2014; i++) {
          var obj = { id: 'y_' + i, name: i + '年'};
          data1.push(obj);
        }

        for (var i = 1; i <= 12; i++) {
          var obj = { id: 'm_' + i, name: i + '月'};
          data2.push(obj);
        }

        for (var i = 1; i <= 31; i++) {
          var obj = { id: 'd_' + i, name: i + '日'};
          data3.push(obj);
        }

        this.demo1 = new UISelect({
          wrapper: this.$('.row1'),
          datamodel: {
            data: data1
          },
          changed: function(item) {
             this.item = item;
          }
        });

        this.demo2 = new UISelect({
          wrapper: this.$('.row2'),
          datamodel: {
            data: data2
          },
          changed: function(item) {
            var curMonth = parseInt(item.name);
            var maxDay = dayFlag[curMonth];

            for(var i=31;i>28;i--) {
              scope.demo3.datamodel.data[i-1].disabled = false;
              if(i>maxDay) {
                scope.demo3.datamodel.data[i-1].disabled = true;
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

    onPreShow: function () {

      this.turning();
    },

    onShow: function () {

    },

    onHide: function () {

    }

  });
});
