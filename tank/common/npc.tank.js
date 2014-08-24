define(['Tank'], function (Tank) {

  return _.inherit(Tank, {
    propertys: function ($super) {
      $super();

      this.HP = 1;

      //最大子弹数
      this.maxBulletSize = 1;

      this.datamodel.speed = 1;
      this.datamodel.status = 'moveing';

      this.dirObj = {
        step: 28,
        size: 32,
        init: 32 * 4,
        flag: 0
      };

      //npc自由行为
      this.selfTick = parseInt(Math.random() * 100);
      this.curSelfTick = 0;

    },

    resetSelfTick: function () {
      this.selfTick = parseInt(Math.random() * 100) ;
    },

    //边界碰撞行为
    borderCrashAction: function () {
      this.changeDir();
    },

    changeDir: function () {
      var dir = ['up', 'right', 'down', 'left'];
      var flag = parseInt(Math.random() * 4);
      this.datamodel.dir = dir[flag];
    },

    moveEndAction: function () {
      this.fire();

      if (this.curSelfTick == this.selfTick) {
        this.changeDir();
        this.curSelfTick = 0;
        this.resetSelfTick();
      }
      this.curSelfTick++;
    },

    initialize: function ($super, opts) {
      $super(opts);
    }

  });

});
