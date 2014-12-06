/*
对select组件的使用，当前最复杂的组件

*/
define(['UILayer', getAppUITemplatePath('ui.group.select'), 'UISelect'], function (UILayer, template, UISelect) {


  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;

      this.datamodel = {
        title: 'scrollLayer',
        tips: 'tips',
        btns: [
          { name: '取消', className: 'cui-btns-cancel' },
          { name: '确定', className: 'cui-btns-ok' }
        ]
      };

      this.data = [];
      this.indexArr = [0, 0, 0];
      this.idArr = [];
      this.scrollArr = [];
      this.changedArr = [
        function (item) {
        },
        function (item) {
        },
        function (item) {
        }
      ];

      this.onOkAction = function (items) {

      };

      this.onCancelAction = function (items) {
        this.hide();
      };

      //这里便只有一个接口了
      this.displayNum = 5;

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
      this.tips = this.$('.cui-roller-tips');
    },


    _initScroll: function () {
      this._destroyScroll();
      var i, len, item, changeAction;
      for (i = 0, len = this.data.length; i < len; i++) {
        item = this.data[i];
        changeAction = this.changedArr[i] || function () { };
        this.scrollArr[i] = new UISelect({
          datamodel: {
            data: item,
            index: this.indexArr[i],
            id: this.idArr[i]
          },
          displayNum: this.displayNum,
          changed: $.proxy(changeAction, this),
          wrapper: this.scrollWrapper
        });

        //纯粹业务需求
        if (i == 0 && len == 3) {
          this.scrollArr[i].on('onShow', function () {
            this.$el.addClass('cui-flex2');
          });
        }

        this.scrollArr[i].show();
      }
    },

    //缺少接口
    setTips: function (msg) {
      this.datamodel.tips = msg;
      this.tips.html(msg);
    },

    _destroyScroll: function () {
      var i, len;
      for (i = 0, len = this.data.length; i < len; i++) {
        if (this.scrollArr[i]) {
          this.scrollArr[i].destroy();
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
