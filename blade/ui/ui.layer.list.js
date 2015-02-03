
define(['UILayer', 'text!T_UILayerList'], function (UILayer, template) {
  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;
      this.animateInClass = 'cm-down-in';
      this.animateOutClass = 'cm-down-out';

      this.list = [];
      this.cancelText = '取消';
      this.className = 'popup-operate';
      this.index = -1;
      this.curClass = 'active';

      this.addEvents({
        'click .js_cancel': 'cancelAction',
        'click .js_item': 'itemAction'
      });

      this.onItemAction = function (data, index, e) {
      };
    
    },

    getViewModel: function () {
      return this._getDefaultViewModel(['list', 'cancelText', 'className', 'index', 'curClass']);
    },

    setIndex: function (i) {
      if (i < 0 || i > this.list.length) return;
      this.index = i;
      this.$('li').removeClass(this.curClass);
      this.$('li[data-index="' + i + '"]').addClass(this.curClass);
    },

    cancelAction: function (e) {
      this.hide();
    },

    itemAction: function (e) {
      var el = $(e.currentTarget);
      var index = el.attr('data-index');
      var data = this.list[index];
      this.setIndex(index);
      this.onItemAction.call(this, data, index, e);

    },

    //弹出层类垂直居中使用
    reposition: function () {
      this.$root.css({
        'position': 'fixed',
        'width': '100%',
        'padding': '10px',
        'left': '0',
        'bottom': '0'
      });
    }

  });

});
