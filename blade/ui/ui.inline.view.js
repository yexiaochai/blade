
/*
用于继承的类，在页面内的view
*/
define(['UIView'], function (UIView) {

  return _.inherit(UIView, {

    //默认属性
    propertys: function ($super) {
      $super();


    },

    initialize: function ($super, opts) {
      $super(opts);


    }

  });

});
