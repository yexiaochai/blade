define(['MoveObj', 'text!tank/common/move.obj.html'], function (MoveObj, template) {

  return _.inherit(MoveObj, {
    propertys: function ($super) {
      $super();

      this.gameType = 'tank';
      //      this.template = template;

      this.HP = 10;

      this.level = 0;

      this.datamodel.speed = 1;
      this.datamodel.bulletSpeed = 4;


      //最大子弹数
      this.maxBulletSize = 1;
      //发出数
      this.bulletSize = 0;

      this.speciality = '';

      this.dirObj = {
        step: 28,
        size: 32,
        init: 0,
        flag: 0
      };

      this.score = 0;

    },

    //这里需要做数据验证
    resetPropery: function () {
      if (this.speciality == 'hp') {
        this.dirObj.init += 32;
      }
    },

    //物体碰撞时要执行的动作,crashObj为被撞的对象，x，y为碰撞前的坐标
    //override
    crashAction: function (crashObj, x, y) {

      this.datamodel.x = x;
      this.datamodel.y = y;

    },

    //击中地方时候触发的事件
    hitEnemy: function (crashObj) {
      //可能击中子弹，也可能击中坦克，击中坦克时候可能会有特殊处理，比如加血
      //这里先简单处理只是英雄的情况
      if (this.gameRule == 'hero') {
        //查看被袭击对象是否为加血机，如果是加血坦克，这里会有回血动作
        if (crashObj.gameRule == 'npc') {
          this.score++;
          if (crashObj.speciality == 'hp') {
            this.HP++;
          }
        }
      }

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
      if (this.status == 'destroy') return;

      if (this.bulletSize == this.maxBulletSize) return;
      var bullet = this.app.createBullet({
        gameRule: this.gameRule + 'Bullet',
        creater: this,
        datamodel: {
          x: (this.datamodel.x + this.datamodel.width / 2),
          y: (this.datamodel.y + this.datamodel.height / 2),
          dir: this.datamodel.dir,
          speed: this.datamodel.bulletSpeed
        }
      });

      bullet.setDir(this.datamodel.dir);
      bullet.setStatus('move');

      this.bulletSize++;
    },

    moveStartAction: function () {
            this.fire();
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

    addEvent: function ($super) {
      $super();
      this.on('onCreate', function () {
        this.$el.addClass('tank');
        this.setStyle();

      });
    }

  });

});
