/*
扮演游戏时钟，全局控制器角色
*/
define(['AbstractView', getViewTemplatePath('index'), 'MoveObj', 'Tank', 'Bullet', 'Boom', 'NPCTank', 'UIAlert'], function (View, viewhtml, MoveObj, Tank, Bullet, Boom, NPCTank, UIAlert) {

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
        this.stopTimer = setTimeout($.proxy(function () {
          this.me.setStatus('stop');
        }, this), 300);
      }, this);
    },

    onCreate: function () {
      this.$el.html(viewhtml);

      this._init();

      this._bindEvent();

    },

    events: {
    },

    onPreShow: function () {
      this.turning();
    },


    //npc制造工厂，不停的制造
    createNPC: function () {
      //重置当前npc数量
      this.app.npcSize = this.app.GAMEOBJ.npc.length;
      if (this.app.npcSize < this.app.maxNpcSize) {
        var flag = parseInt(Math.random() * 4);
        var coord = [[0, 0], [0, 384], [384, 0], [384, 384]];
        this.app.createNPC({
          app: this.app,
          wrapper: this.$el.find('#map'),
          datamodel: {
            x: coord[flag][0],
            y: coord[flag][1]
          }
        });
      }
    },

    dataChange: function () {
      this.$('#hp').html(this.me.HP);
      this.$('#score').html(this.me.score);
      this.$('#level').html(this.me.level);
    },

    //英雄升级
    levelUp: function () {
      var level = parseInt(this.me.score / 10);
      if (level == this.me.level) return;

      this.me.level = level;
      if (level >= this.app.levelParameter.length) level = this.app.levelParameter.length - 1;
      var param = this.app.levelParameter[level];
      this.me.HP = 10 + level;

      this.me.datamodel.speed = param.speed;
      this.me.datamodel.bulletSpeed = param.bulletSpeed;
      this.me.maxBulletSize = param.maxBulletSize;
      this.me.dirObj.init = param.init;
      this.me.setStyle();

      //级数增加响应坦克增加一个
      this.app.maxNpcSize = 2 + level;


    },

    _init: function () {

      this.app = {
        //英雄升级参数
        levelParameter: [
          { speed: 1, bulletSpeed: 4, maxBulletSize: 1, init: 0 },
          { speed: 1, bulletSpeed: 4, maxBulletSize: 1, init: 0 },
          { speed: 2, bulletSpeed: 6, maxBulletSize: 1, init: 0 },
          { speed: 2, bulletSpeed: 6, maxBulletSize: 2, init: 32 },
          { speed: 2, bulletSpeed: 6, maxBulletSize: 2, init: 32 },
          { speed: 2, bulletSpeed: 6, maxBulletSize: 3, init: 64 },
          { speed: 2, bulletSpeed: 6, maxBulletSize: 4, init: 64 },
          { speed: 2, bulletSpeed: 6, maxBulletSize: 4, init: 96 },
          { speed: 2, bulletSpeed: 7, maxBulletSize: 5, init: 96 },
          { speed: 2, bulletSpeed: 7, maxBulletSize: 5, init: 96 },
          { speed: 2, bulletSpeed: 8, maxBulletSize: 6, init: 96 },
          { speed: 2, bulletSpeed: 8, maxBulletSize: 7, init: 96 },
          { speed: 2, bulletSpeed: 9, maxBulletSize: 8, init: 96 },
          { speed: 2, bulletSpeed: 9, maxBulletSize: 9, init: 96 },
          { speed: 2, bulletSpeed: 9, maxBulletSize: 10, init: 96 }

        ],
        npcObj: {
          NO1: {
            dirObj: {
              init: 32 * 4
            }
          },
          NO2: {
            dirObj: {
              init: 32 * (4 + 2)
            },
            datamodel: {
              speed: 2
            }
          },
          NO3: {
            dirObj: {
              init: 32 * (4 + 4)
            },
            datamodel: {
              bulletSpeed: 6
            }
          },
          NO4: {
            dirObj: {
              init: 32 * (4 + 6)
            },
            HP: 4
          }
        },
        maxNpcSize: 2,
        npcSize: 0,
        gameStatus: false,
        GAMEOBJ: {
          hero: [], //暂时只有一个hero，这里先不予关注
          npc: [],
          heroBullet: [],
          npcBullet: [],
          boom: []
        },
        tick: $.proxy(function () {
          if (this.me.status == 'destroy') {
            this.app.gameStatus = false;

            var scope = this;
            var alert = new UIAlert({
              datamodel: {
                title: '游戏结束',
                content: '英雄，要不我们再来一局？'
              },
              okAction: function () {
//                location.reload();
                  scope.gameRestar();
                this.hide();
              },
              cancelAction: function () {
//                location.reload();
                this.hide();
              }
            });
            alert.show();

          }

          $.each(this.app.GAMEOBJ, $.proxy(function (k, v) {
            //首先做筛选
            this.app.GAMEOBJ[k] = _.filter(this.app.GAMEOBJ[k], function (item) {
              return item.status !== 'destroy';
            });
            for (var i = 0, len = this.app.GAMEOBJ[k].length; i < len; i++) {
              this.app.GAMEOBJ[k][i].move();
            }
          }, this));

          this.createNPC();
          this.dataChange();
          this.levelUp();

          if (this.app.gameStatus) {
            rAF($.proxy(this.app.tick, this));
          }

        }, this),
        //创建NPC坦克
        createNPC: $.proxy(function (opts) {
          opts = $.extend({
            gameRule: 'npc',
            wrapper: this.$el.find('#map'),
            app: this.app
          }, opts, true);
          var flag = parseInt(Math.random() * 4);
          if (parseInt(Math.random() * 5) == 4) {
            opts.speciality = 'hp';
          }
          opts = $.extend(opts, this.app.npcObj['NO' + (flag + 1)], true);
          console.log(opts)

          var npc = new NPCTank(opts);
          var i, len, bullet;

          npc.show();

          /*这里英雄每一步移动会对NPC产生影响，同样NPC会对影响造成影响
          npc只需要关注英雄和英雄发出的子弹即可，英雄处理要复杂的对多
          */
          this.me.registerObserver(npc);
          npc.registerObserver(this.me);

          //缺陷，npc暂时不关注npc，可互相穿透
          //          $.each(this.app.GAMEOBJ.npc, function (i, item) {
          //            npc.registerObserver(item);
          //          });

          //记录最后一个npc以便测试
          this.npc = npc;

          this.app.GAMEOBJ.npc.push(npc);

        }, this),
        //创建我方英雄坦克
        createHero: $.proxy(function () {
          this.me = new Tank({
            datamodel: {
              x: 192,
              y: 192
            },
            gameRule: 'hero',
            wrapper: this.$el.find('#map'),
            app: this.app
          });
          this.me.show();
          window.me = this.me;
          this.app.GAMEOBJ.hero.push(this.me);

        }, this),
        createBullet: $.proxy(function (opts) {
          //子弹的创建要区分是hero还是npc
          opts = $.extend({
            wrapper: this.$el.find('#map'),
            app: this.app
          }, opts, true);
          var gameRule = opts.gameRule;
          var bullet = new Bullet(opts);
          bullet.show();

          //这里根据子弹角色不同，会有不同的观察对象，npc子弹对应英雄，英雄子弹对象npc！

          //英雄子弹需要被npc坦克以及子弹观察
          if (gameRule == 'heroBullet') {
            $.each(this.app.GAMEOBJ.npc, function (i, item) {
              bullet.registerObserver(item);
            });

            $.each(this.app.GAMEOBJ.npcBullet, function (i, item) {
              bullet.registerObserver(item);
            });
          } else if (gameRule == 'npcBullet') {
            //npc子弹来了，英雄就要小心了
            $.each(this.app.GAMEOBJ.hero, function (i, item) {
              bullet.registerObserver(item);
            });

            $.each(this.app.GAMEOBJ.heroBullet, function (i, item) {
              bullet.registerObserver(item);
            });
          }

          this.app.GAMEOBJ[gameRule].push(bullet);

          return bullet;
        }, this),
        createBoom: $.proxy(function (opts) {
          opts = $.extend({
            wrapper: this.$el.find('#map'),
            app: this.app
          }, opts, true);
          var boom = new Boom(opts);
          boom.show();
          this.app.GAMEOBJ.boom.push(boom);
          return boom;

        }, this)

      };
    },

    //游戏开始
    gameStart: function () {
      //创建英雄
      this.app.createHero();

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
  //重新开始
  gameRestar: function() {
      //创建英雄
      this.app.createHero();
      this.app.gameStatus = true;
      this.me.status = 'move';
      //清除npc坦克
      $.each(this.app.GAMEOBJ.npc, function (i, item) {
          item.destroy()
      });

      //开始游戏计时
      this.app.tick();
  },


      onShow: function () {
      this.gameStart();
    },

    onHide: function () {

    }

  });
});
