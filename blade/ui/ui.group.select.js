/*
******bug******
这个布局是个大问题，布局需要重做
对select组件的使用，当前最复杂的组件
*/
define(['UILayer', 'text!T_UIGroupSelect', 'text!C_UIGroupSelect', 'UISelect'], function (UILayer, template, style, UISelect) {

  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;

      this.addUIStyle(style);

      this.scrollCreated = false;

      this.title = '';
      this.tips = '';
      this.btns = [
        { name: '取消', className: 'cui-btns-cancel js_cancel' },
        { name: '确定', className: 'cui-btns-ok js_ok' }
      ];

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

      this.onOkAction = function (items) { };

      this.onCancelAction = function (items) {
        this.hide();
      };

      //这里便只有一个接口了
      this.displayNum = 5;

      this.addEvents({
        'click .js_ok': 'okAction',
        'click .js_cancel': 'cancelAction'
      });

    },

    getViewModel: function () {
      return this._getDefaultViewModel(['title', 'tips', 'btns']);
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
      this.scrollWrapper = this.$('.js_wrapper');
      this.tips = this.$('.js_tips');
    },


    _initScroll: function () {
      if (this.scrollCreated) return;
      this.scrollCreated = true;
      //      this._destroyScroll();
      var i, len, item, changeAction;
      for (i = 0, len = this.data.length; i < len; i++) {
        item = this.data[i];
        changeAction = this.changedArr[i] || function () { };
        this.scrollArr[i] = new UISelect({
          data: item,
          index: this.indexArr[i],
          key: this.idArr[i],
          onCreate: function () {
            this.$root.addClass('cm-scroll-select-wrap');
          },
          displayNum: this.displayNum,
          changed: $.proxy(changeAction, this),
          wrapper: this.scrollWrapper
        });

        //纯粹业务需求
        if (i == 0 && len == 3) {
          this.scrollArr[i].on('onShow', function () {
            //            this.$el.addClass('cm-scroll-select-wrap');
          });
        }

        this.scrollArr[i].show();
      }
    },

    //缺少接口
    setTips: function (msg) {
      this.tips = msg;
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
      this.scrollCreated = false;
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
        //        this._destroyScroll();

      }, 1);

    }

  });

});
