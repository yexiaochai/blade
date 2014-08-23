/*
扮演游戏时钟，全局控制器角色
*/
define(['AbstractView', getViewTemplatePath('index'), 'MoveObj', 'Tank', 'Bullet', 'Boom'], function (View, viewhtml, MoveObj, Tank, Bullet, Boom) {

  var rAF = window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function (callback) { window.setTimeout(callback, 1000 / 60); };

  var getDir = function (code) {
    if (code == '87' || code == '119') {
      return 'up';
    }
    if (code == '100' || code == '68') {
      return 'right';
    }
    if (code == '115' || code == '83') {
      return 'down';
    }
    if (code == '97' || code == '65') {
      return 'left';
    }
    return null;
  };

  return _.inherit(View, {

    _bindEvent: function () {
      document.onkeydown = $.proxy(function (evt) {
        evt = (evt) ? evt : window.event;
        var keyCode = evt.keyCode;
        var charCode = evt.charCode;
        var dir = getDir();
        if (this.stopTimer) clearTimeout(this.stopTimer);
        if (keyCode) {
          dir = getDir(keyCode.toString());
        }
        if (charCode) {
          dir = getDir(charCode.toString());
        }
        if (dir) {
          this.me.setDir(dir);
          this.me.setStatus('move');
        }

        if (charCode == '106' || keyCode == '74') {
          this.me.fire();
        }

        evt.preventDefault();
        return false;
      }, this);

      document.onkeyup = $.proxy(function (evt) {
        if (this.stopTimer) clearTimeout(this.stopTimer);
        //        this.stopTimer = setTimeout($.proxy(function () {
        this.me.setStatus('stop');
        //        }, this), 100);
      }, this);
    },

    onCreate: function () {
      this.$el.html(viewhtml);

      this._init();

      this._bindEvent();

    },

    events: {
      'click #stop': function () {
        this.app.gameStatus = false;
      }
    },

    onPreShow: function () {
      this.turning();
    },

    _init: function () {

      //游戏对象
      this.GAMEOBJ = [];

      this.app = {
        gameStatus: false,
        GAMEOBJ: [],
        tick: $.proxy(function () {
          //清理已被销毁对象
          this.app.GAMEOBJ = _.filter(this.app.GAMEOBJ, function (item) {
            return item.status !== 'destroy';
          });

          for (var i = 0, len = this.app.GAMEOBJ.length; i < len; i++) {
            this.app.GAMEOBJ[i].move();
          }
          if (this.app.gameStatus) {
            rAF($.proxy(this.app.tick, this));
          }
        }, this),
        //创建NPC坦克
        createNPC: $.proxy(function (opts) {
          var npc = new Tank(opts);
          npc.show();
          this.me.registerObserver(npc);

          this.npc = npc;

          this.app.GAMEOBJ.push(npc);


        }, this),
        //创建我方英雄坦克
        createHero: $.proxy(function () {
          this.me = new Tank({
            wrapper: this.$el.find('#map'),
            app: this.app
          });
          this.me.show();
          this.app.GAMEOBJ.push(this.me);

        }, this),
        createBullet: $.proxy(function (opts) {
          opts = $.extend({
            wrapper: this.$el.find('#map'),
            app: this.app
          }, opts, true);

          var bullet = new Bullet(opts);
          bullet.show();

          bullet.registerObserver(this.npc);

          this.app.GAMEOBJ.push(bullet);



          return bullet;
        }, this),
        createBoom: $.proxy(function (opts) {
          opts = $.extend({
            wrapper: this.$el.find('#map'),
            app: this.app
          }, opts, true);
          var boom = new Boom(opts);
          boom.show();
          this.app.GAMEOBJ.push(boom);
          return boom;

        }, this)

      };
    },

    //游戏开始
    gameStart: function () {
      //创建英雄
      this.app.createHero();

      this.app.createNPC({
        app: this.app,
        wrapper: this.$el.find('#map'),
        datamodel: {
          x: 200,
          y: 200
        }
      });


      this.app.gameStatus = true;
      //开始游戏计时
      this.app.tick();

    },

    //游戏暂停
    gameStop: function () {

    },

    //游戏结束
    gameOver: function () {

    },

    onShow: function () {
      this.gameStart();
    },

    onHide: function () {


    }

  });
});
