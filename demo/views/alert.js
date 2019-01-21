define(['View', getViewTemplatePath('alert'), 'UIAlert', 'UIGroupSelect'], function (View, viewhtml, UIAlert, UIGroupSelect) {

  return _.inherit(View, {
    propertys: function ($super) {
      $super();
      this.template = viewhtml;

      this.addEvents({
        'click .js_demo001': 'demo01',
        'click .js_demo02': 'demo02'
      });
    },

    showSelect: function () {
      var i, h = [], m = [], s = [];
      for(i = 1; i < 13; i++) {
        h.push({
          id: i,
          name: i
        })
      }

      for(i = 1; i < 61; i++) {
        m.push({
          id: i,
          name: i
        });
        s.push({
          id: i,
          name: i
        });
      }

      if (!this.select) {
        this.select = new UIGroupSelect({
          tips: '请选择时分秒',
          title: '选择矿石剩余时间',
          idArr: [],
          data: [h, m, s]
        });
      }
      this.select.show();

    },

    addEvent: function ($super) {
      $super();
      this.on('onShow', function () {
        this.showSelect();
      });
    },

    demo01: function () {
      var txt = this.$('.js_txt001').val();
      var n = new Date();
      var t = txt;
      var arrTime = t.split('-');
      var howLong = parseInt(arrTime[0]) * 3600 + parseInt(arrTime[1]) * 60 + parseInt(arrTime[2]);
      var theTime = new Date(n.getTime() + parseInt(howLong) * 1000);

      if (!this.alert01) {
        this.alert01 = new UIAlert({
          title: '下次矿石时间',
          content: theTime.toLocaleTimeString()

        });
      }

      this.alert01.show();

    },
    demo02: function () {
      if (!this.alert02) {
        this.alert02 = new UIAlert({
          title: '购票须知',
          content: '凭身份证可以通过',
          btns: [
            { name: '知道了', className: 'cui-btns-ok' },
            { name: '不知道', className: 'cui-btns-no' },
            { name: '未知', className: 'cui-btns-unknown' }
          ],

          events: {
            'click .cui-btns-ok': 'okAction',
            'click .cui-btns-no': 'noAction',
            'click .cui-btns-unknown': 'unknownAction'
          },
          okAction: function () {
            alert('这里可以执行ok callback');
            this.hide();
          },
          noAction: function () {
            alert('这里可以执行no ok callback');
            this.hide();
          },
          unknownAction: function () {
            alert('这里可以执行unknow callback');
            this.hide();
          }
        });
      }

      this.alert02.show();
    }

  });

});
