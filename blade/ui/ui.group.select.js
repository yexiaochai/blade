/*
对select组件的使用，当前最复杂的组件

*/
define(['UILayer', getAppUITemplatePath('ui.group.select'), 'UISelect'], function (UILayer, template, UISelect) {


  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;

      var data2 = [];
      var data3 = [];


      var data1 = [];

      for (var i = 0; i < 10; i++) {
        var obj = { id: 'q_' + i, name: '项目_' + i };

        if (i % 3 == 0) obj.disabled = true;

        data1.push(obj);

      }

      for (var i = 0; i < 10; i++) {
        data2.push({ id: 'w_' + i, name: '项目_' + i });
      }

      for (var i = 0; i < 2; i++) {
        data3.push({ id: 's_' + i, name: '项目_' + i });
      }

      this.datamodel = {
        title: 'scrollLayer',
        tips: 'tips',
        btns: [
          { name: 'cancel', className: 'cui-btns-cancel' },
          { name: 'ok', className: 'cui-btns-ok' }
        ]
      };

      this.data = [data1, data2, data3];
      this.indexArr = [0, 0, 1];
      this.idArr = [1, 'w_9', 2];
      this.scrollArr = [];
      this.changedArr = [
        function (item) {
          console.log(item);
        },
        function (item) {
          console.log(item);
        },
        function (item) {
          console.log(item);
        }
      ];

      this.onOkAction = function (items) {
        console.log('ok');
        console.log(items);

      };

      this.onCancelAction = function (items) {
        console.log('cancel');
        console.log(items);

      };

      //这里便只有一个接口了
      this.displayNum = 3;

      this.events = {
        'click .cui-btns-ok': 'okAction',
        'click .cui-btns-cancel': 'cancelAction'
      };

    },

    okAction: function (e) {
      var items = [];
      for (i = 0, len = this.scrollArr.length; i < len; i++) {
        items.push(this.scrollArr[i].getSelected());
      }
      this.onOkAction.call(this, items);
    },

    cancelAction: function (e) {
      var items = [];
      for (i = 0, len = this.scrollArr.length; i < len; i++) {
        items.push(this.scrollArr[i].getSelected());
      }
      this.onCancelAction.call(this, items);
    },

    initElement: function () {
      this.scrollWrapper = this.$('.cui-roller');
    },


    _initScroll: function () {
      this._destroyScroll();
      var i, len, item;
      for (i = 0, len = this.data.length; i < len; i++) {
        item = this.data[i];

        this.scrollArr[i] = new UISelect({
          datamodel: {
            data: item,
            index: this.indexArr[i],
            id: this.idArr[i]
          },
          displayNum: this.displayNum,
          changed: $.proxy(this.changedArr[i], this),
          wrapper: this.scrollWrapper
        });
        this.scrollArr[i].show();
      }
    },

    _destroyScroll: function () {
      var i, len;
      for (i = 0, len = this.data.length; i < len; i++) {
        if (this.scrollArr[i]) {
          this.scrollArr[i].hide();
          this.scrollArr[i] = null;
        }
      }

    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    addEvent: function ($super) {
      $super();

      //这个要在第一位，因为后面会执行父类的position方法居中，尺寸没有就不行
      this.on('onShow', function () {
        this._initScroll();

      }, 1);

      this.on('onHide', function () {
        this._destroyScroll();

      }, 1);

    }

  });

});
