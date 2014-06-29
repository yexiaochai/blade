
/*
用于继承的类，会自动垂直居中

*/
define(['UILayer'], function (UILayer) {


  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      this.template = '<span><%=text%></span>';
      this.datamodel = {
        text: 'toast'
      };
    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    addEvent: function ($super) {
      $super();
      this.on('onCreate', function () {
        this.$el.addClass('cui-toast');
      });

    }

  });


});
