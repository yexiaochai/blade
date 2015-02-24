
/*
用于继承的类，会自动垂直居中

*/
define(['UILayer', 'text!T_UIAlert'], function (UILayer, template) {

  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
    },

    resetDefaultProperty: function ($super) {
      $super();

      this.maskToHide = false;

      //html模板
      this.template = template;

      //默认数据
      this.title = '';
      this.content = '';
      this.btns = [
          { name: '知道了', className: 'js_ok' }
        ];

      //事件机制
      this.addEvents({
        'click .js_ok': 'okAction',
        'click .js_cancel': 'cancelAction'
      });

      this.okAction = function () {
        this.hide();
      };

      this.cancelAction = function () {
        this.hide();
      };
    },

    getViewModel: function () {
      return this._getDefaultViewModel(['title', 'content', 'btns']);
    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    addEvent: function ($super) {
      $super();
      this.on('onCreate', function () {
        //        this.$el.addClass('cui-alert');
      });
    },

    setDatamodel: function (datamodel, okAction, cancelAction) {
      if (!datamodel) datamodel = {};
      _.extend(this.datamodel, datamodel);
      okAction && (this.okAction = okAction);
      cancelAction && (this.cancelAction = cancelAction);
      this.refresh();
    }

  });

});
