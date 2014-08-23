define(['MoveObj', 'text!tank/common/move.obj.html'], function (MoveObj, template) {

  return _.inherit(MoveObj, {
    propertys: function ($super) {
      $super();

      this.gameType = 'tank';
      //      this.template = template;

      this.HP = 2;

      //最大子弹数
      this.maxBulletSize = 3;
      //发出数
      this.bulletSize = 0;

      this.dirObj = {
        step: 28,
        size: 32,
        init: 0,
        flag: 0
      };

    },

    //物体碰撞时要执行的动作,crashObj为被撞的对象，x，y为碰撞前的坐标
    //override
    crashAction: function (crashObj, x, y) {

      this.datamodel.x = x;
      this.datamodel.y = y;

    },

    //被击中，袭击者这里只能捕捉到子弹，而根据其creater可找到对应坦克
    //并且这里是被子弹状才会触发...
    passiveCrashAction: function (raider) {

      this.HP--;

      //嗝屁了
      if (this.HP <= 0) {
        this.app.createBoom({
          datamodel: {
            x: (this.datamodel.x + this.datamodel.width / 2),
            y: (this.datamodel.y + this.datamodel.height / 2),
            level: 4
          }
        });
        this.destroy();
      }

    },

    //子弹爆炸时会触发发出者一个回调
    bulletBlast: function () {
      this.bulletSize--;

    },

    //坦克特有方法，开火
    fire: function () {
      if (this.bulletSize == this.maxBulletSize) return;
      var bullet = this.app.createBullet({
        creater: this,
        datamodel: {
          x: (this.datamodel.x + this.datamodel.width / 2),
          y: (this.datamodel.y + this.datamodel.height / 2)
        }
      });

      bullet.setDir(this.datamodel.dir);
      bullet.setStatus('move');

      this.bulletSize++;
    },

    //根据方向，设置样式
    setStyle: function () {
      var pos = 0;
      var step = this.dirObj.step;
      var size = this.dirObj.size;
      var init = this.dirObj.init;
      var posArr = {
        up: init,
        right: init + step * size,
        down: init + step * size * 2,
        left: init + step * size * 3
      };
      pos = this.dirObj.flag % 2 == 0 ? posArr[this.datamodel.dir] : posArr[this.datamodel.dir] + (size * step / 2);
      this.dirObj.flag++;
      this.$el.css('background-position', '-' + pos + 'px 0px');
    },

    upAction: function ($super) {
      $super();
      this.setStyle();
    },

    rightAction: function ($super) {
      $super();
      this.setStyle();
    },

    downAction: function ($super) {
      $super();
      this.setStyle();
    },

    leftAction: function ($super) {
      $super();
      this.setStyle();

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
        this.setStyle();

      });
    }

  });

});
