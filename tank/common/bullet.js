define(['MoveObj', 'text!tank/common/move.obj.html', 'Boom'], function (MoveObj, template, Boom) {

  return _.inherit(MoveObj, {
    propertys: function ($super) {
      $super();

      this.gameType = 'bullet';

      //这里要做一个修正，不能覆盖
      this.datamodel.width = this.datamodel.height = 8;

      this.datamodel.speed = 5;

      //      this.template = template;

    },

    //物体碰撞时要执行的动作,crashObj为被撞的对象，x，y为碰撞前的坐标
    //override
    crashAction: function (crashObj, x, y) {

      //            this.datamodel.x = x + this.speed;
      //            this.datamodel.y = y + this.speed;
      console.log('爆炸');
      crashObj.passiveCrashAction();
      this.blast(2);
    },

    borderCrashAction: function () {
      this.blast(2);
    },

    //子弹特有动作，爆炸
    blast: function (level) {
      this.app.createBoom({
        datamodel: {
          x: (this.datamodel.x + this.datamodel.width / 2),
          y: (this.datamodel.y + this.datamodel.height / 2),
          level: level
        }
      });
      this.creater.bulletBlast();
      this.destroy();
    },

    initElement: function () {

    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    //这里需要做数据验证
    resetPropery: function () {
      this.datamodel.x -= this.datamodel.width / 2;
      this.datamodel.y -= this.datamodel.height / 2;
    },

    addEvent: function ($super) {
      $super();
      this.on('onCreate', function () {
        this.$el.addClass('bullet');
      });
    }

  });

});
