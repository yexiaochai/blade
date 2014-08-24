//爆炸对象，出现的意义便是为了消失
define(['MoveObj'], function (MoveObj) {

  return _.inherit(MoveObj, {
    propertys: function ($super) {
      $super();
      this.gameType = 'boom';

      //爆炸级别
      this.datamodel.level = 4;
      this.datamodel.width = this.datamodel.height = 64;

      //当前级别
      this.boomlevel = 0;

    },

    //重新父类创建根节点方法
    createRoot: function (html) {
      this.$el = $(html).hide().attr('id', this.id);
    },

    //根据爆炸级别设置当前样式
    setStyle: function () {
      this.$el.css('background-position', (-1 * (64 * this.boomlevel)) + 'px 0px');
    },

    //这个处理不太精致，需要再处理
    move: function () {
      this.setStyle();
      if (this.boomlevel == this.datamodel.level) {
        setTimeout($.proxy(function () {
          this.destroy();
        }, this), 100);
        return;
      }
      this.boomlevel++;
    },

    initElement: function () {

    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    //对坐标进行修正
    resetPropery: function () {
      this.datamodel.x -= this.datamodel.width / 2;
      this.datamodel.y -= this.datamodel.height / 2;
    },

    addEvent: function ($super) {
      $super();
      this.on('onCreate', function () {
        this.$el.addClass('boom');
        this.setStyle();
      });
    }

  });

});
