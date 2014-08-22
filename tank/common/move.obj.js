/*

运动对象，需要具有的属性为
1 当前尺寸
2 当前方向
3 

*/
define(['UIView', 'text!tank/common/move.obj.html'], function (UIView, template) {

  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();

      this.template = template;

      this.datamodel = {
        width: 32,
        height: 32,
        dir: 'up',
        status: 'stop',
        x: 0,
        y: 0,
        speed: 2
      };

      //容器最大值与最小值
      this.maxX = this.maxY = 416;
      this.minX = this.minY = 0;

      this.events = {};

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
      this.trigger('onBorderCrash');
      return true;
    },

    testObjCreah: function () {
      
    },

    //检测碰撞
    testCrash: function (x, y) {
      this.testBorderCrash(x, y);

      //检测运动物体碰撞
      this.testObjCreah();

    },


    move: function () {
      if (this.datamodel.status == 'stop') return;
      var x = this.datamodel.x, y = this.datamodel.y;
      this[this.datamodel.dir + 'Action']();

      //每次移动需要检测碰撞
      this.testCrash(x, y);

      //      this.resetPosition();
      this.tanslate(this.datamodel.x, this.datamodel.y)

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
