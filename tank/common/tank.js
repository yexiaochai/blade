define(['MoveObj', 'text!tank/common/move.obj.html'], function (MoveObj, template) {

  return _.inherit(MoveObj, {
    propertys: function ($super) {
      $super();

      this.gameType = 'tank';
      //      this.template = template;

      this.HP = 1;

    },

    //物体碰撞时要执行的动作,crashObj为被撞的对象，x，y为碰撞前的坐标
    //override
    crashAction: function (crashObj, x, y) {

      this.datamodel.x = x;
      this.datamodel.y = y;

    },

    //被击中，袭击者这里只能捕捉到子弹，而根据其creater可找到对应坦克
    passiveCrashAction: function (raider) {

      this.HP--;

      //嗝屁了
      if (this.HP <=0) {
        this.app.createBoom({
          datamodel: {
            x: (this.datamodel.x + this.datamodel.width / 2),
            y: (this.datamodel.y + this.datamodel.height / 2),
            level: 4
          }
        });
//        this.destroy();
      }

    },

    //子弹爆炸时会触发发出者一个回调
    bulletBlast: function () {
      console.log('子弹爆炸了');
    },

    //坦克特有方法，开火
    fire: function () {
      var bullet = this.app.createBullet({
        creater: this,
        datamodel: {
          x: (this.datamodel.x + this.datamodel.width / 2),
          y: (this.datamodel.y + this.datamodel.height / 2)
        }
      });

      bullet.setDir(this.datamodel.dir);
      bullet.setStatus('move');

    },

    initElement: function () {

    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    //这里需要做数据验证
    resetPropery: function () {

    },

    addEvent: function ($super) {
      $super();
      this.on('onCreate', function () {
        this.$el.addClass('tank');
      });
    }

  });

});
