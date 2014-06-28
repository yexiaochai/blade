
/*
用于继承的类，会自动垂直居中

*/
define(['UIView'], function (UIView) {


  return _.inherit(UIView, {

    //默认属性
    propertys: function ($super) {
      $super();



    },

    initialize: function ($super, opts) {

      $super(opts);

    },

    addEvent: function () {
      this.on('onCreate', function () {
        this.$el.addClass('cui-layer');
      });

      this.on('onShow', function () {
        this.reposition();
        this.setzIndexTop();
      });
    },

    //弹出层类垂直居中使用
    reposition: function () {
      this.$el.css({
        'margin-left': -($(this.$el).width() / 2) + 'px',
        'margin-top': -($(this.$el).height() / 2) + 'px'
      });
    }

  });

});
