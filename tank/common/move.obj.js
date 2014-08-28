define(['UIView', 'text!tank/common/move.obj.html'], function (UIView, template) {

  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();

      //全局游戏时钟，非常关键的属性
      this.app = null;
      //创造者
      this.creater = null;

      this.gameType = 'abstract.obj';

      this.template = template;

      this.datamodel = {
        width: 32,
        height: 32,
        dir: 'up',
        status: 'stop',
        x: 0,
        y: 0,
        speed: 1
      };

      //容器最大值与最小值
      this.maxX = this.maxY = 416;
      this.minX = this.minY = 0;

      this.events = {};

      //当前对象的观察者，每一次该对象的move皆会被其观察者捕捉，并且会有响应，这里可以检测碰撞
      //这里回调函数至少具有两个对象，观察者与被观察者，其它因素需要剥离
      this.observers = []

    },

    setOption: function (options) {

      for (var k in options) {
        if (k == 'datamodel' || k == 'dirObj') {
          _.extend(this[k], options[k]);
          continue;
        }
        this[k] = options[k]
      }
      //      _.extend(this, options);
    },

    //添加对象观察者
    //这里注册的对象可能是坦克或者子弹，甚至墙壁对象，因为我们这里没有墙壁对象暂时不予理睬
    registerObserver: function (moveObj) {
      //添加前做判断，重复判断以及对象判断
      //......

      if (_.indexOf(this.observers, moveObj) == -1)
        this.observers.push(moveObj);
    },

    unregisterObserver: function (moveObj) {
      // 从observers的队列中剔除一个观察者
      this.observers = _.filter(this.observers, function (item) {
        return item.id !== moveObj.id;
      });
    },

    //因为一些原因，这个可能并不能真正释放......
    destroy: function ($super) {
      this.datamodel.status = 'stop';
      this.status = 'destroy';
      //清理被观察者，释放引用，方便释放
      this.observers = [];

      $super();
    },

    //通知各个观察者，被观察对象移动了，这个时候会触发各个观察者的回调，这里的回调是检测碰撞
    //.......感觉这个testCrash有点过于片面，不能很好的表达意思.......
    /**************
    如果中间发生了一次碰撞，当前其它观察者将不会执行
    这里还有一点需要注意，如果发生碰撞，会通知双方对象，但是动作由被观察者发出
    **************/
    notifyMove: function (x, y) {

      //检测观察者是否被销毁，销毁了的话这里需要做处理
      this.observers = _.filter(this.observers, function (item) {
        return item.status !== 'destroy';
      });

      var obj = null, i = 0, len = this.observers.length;
      for (i = 0; i < len; i++) {
        obj = this.observers[i];
        //我这里还是定义为消息引发者开启检测算了
        if (this.testCrash(obj, x, y)) {
          //如果发生碰撞这里便不进行以下逻辑处理了
          return;
        }
      }
    },

    /*检测物体碰撞，该方法会作为回调处理
    这个方法比较关键，有很多点需要再斟酌，每次move触发时候通知到各个观察者，检测到发生碰撞的后续处理是不同的
    ① 坦克与坦克之间
    ② 我方子弹与NPC方的子弹
    ③ NPC与NPC之间的子弹（这个可以忽略，因为不会被注册）
    ④ 我方子弹与NPC坦克
    ⑤ NPC坦克子弹与我方坦克
    因为以上原因，这个函数需要被其子类重写

    */
    testCrash: function (crashObj, x, y) {
      //crashObj为将要被碰撞对象，x与y为移动对象之前坐标
      var isCrash = false;

      isCrash = this._testCrash(
        this.datamodel.x,
        this.datamodel.y,
        this.datamodel.width,
        this.datamodel.height,
        crashObj.datamodel.x,
        crashObj.datamodel.y,
        crashObj.datamodel.width,
        crashObj.datamodel.height
       );

      //发生碰撞了，触发回调，这里还要注意的是到底是什么撞了什么
      //这里一个是主动发出，一个是被动发出，主动发出者需要知道撞了什么，被动发出者需要知道被什么撞了
      if (isCrash) {
        this.crashAction(crashObj, x, y);
        //        crashObj.passiveCrashAction.call(crashObj, this);
      }

      return isCrash;
    },

    //被撞的时候发生的动作，好像无用
    passiveCrashAction: function (raider) {

    },

    //物体碰撞时要执行的动作,crashObj为被撞的对象，x，y为碰撞前的坐标
    //override
    crashAction: function (crashObj, x, y) {

    },

    //到达边界时的行为
    borderCrashAction: function () {
      
    },

    //单纯做碰撞检测，如果四个点在发生重合则发生碰撞
    //这个是简单的矩形相交逻辑判断，中心点监测法
    _testCrash: function (ax, ay, aw, ah, bx, by, bw, bh) {
      if (by + bh < ay || by > ay + ah || bx + bw < ax || bx > ax + aw)
        return false;
      return true;
    },

    //重新父类创建根节点方法
    createRoot: function (html) {
      this.$el = $(html).hide().attr('id', this.id);
    },

    setDir: function (dir) {
      //验证方向
      //      if (!this._validateDir(dir)) return;
      this.datamodel.dir = dir;
      //do...

    },

    setStatus: function (status) {
      //做状态验证
      this.datamodel.status = status;
    },

    tanslate: function (x, y) {
      this.$el.css({
        left: x,
        top: y
      });
    },

    upAction: function () {
      this.datamodel.y -= this.datamodel.speed;
    },

    rightAction: function () {
      this.datamodel.x += this.datamodel.speed;
    },

    downAction: function () {
      this.datamodel.y += this.datamodel.speed;
    },

    leftAction: function () {
      this.datamodel.x -= this.datamodel.speed;
    },

    //验证x，y值，做还原
    //1 到达边界
    //2 活动对象碰撞
    //3 活动对象碰撞需要考虑子弹与坦克碰撞以及坦克与坦克碰撞
    resetPosition: function () {
      //到达边界
    },

    //检测边框碰撞事件
    testBorderCrash: function (x, y) {
      if (this.datamodel.dir == 'up' && this.datamodel.y >= this.minY) return false;
      if (this.datamodel.dir == 'right' && (this.datamodel.x + this.datamodel.width) <= this.maxX) return false;
      if (this.datamodel.dir == 'down' && (this.datamodel.y + this.datamodel.height) <= this.maxY) return false;
      if (this.datamodel.dir == 'left' && this.datamodel.x >= this.minX) return false;

      this.datamodel.x = x;
      this.datamodel.y = y;
      //触发碰撞事件
      this.borderCrashAction();
      return true;
    },

    //移动结束触发的事件
    moveEndAction: function () {

    },

    //重写
    moveStartAction: function () {

    },

    move: function () {
      this.moveStartAction();
      if (this.datamodel.status == 'stop') return;
      var x = this.datamodel.x, y = this.datamodel.y;
      this[this.datamodel.dir + 'Action']();

      //边界检测
      this.testBorderCrash(x, y);

      //通知各个观察者，叔叔动了！！！这里将发生运动，但是动作未发出，称“发在意先”
      //发布消息，传入临时坐标以便处理
      this.notifyMove(x, y);

      //      this.resetPosition();
      this.tanslate(this.datamodel.x, this.datamodel.y)
      this.moveEndAction();
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
        this.$el.addClass('moveobj');
      });
    }

  });

});
