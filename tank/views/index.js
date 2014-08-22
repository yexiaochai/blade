define(['AbstractView', getViewTemplatePath('index'), 'MoveObj'], function (View, viewhtml, MoveObj) {

  var rAF = window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function (callback) { window.setTimeout(callback, 1000 / 60); };

  return _.inherit(View, {
    getDir: function (code) {
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
    },
    onCreate: function () {
      this.$el.html(viewhtml);

      this.gameStatus = false;

      //游戏对象
      this.GAMEOBJ = [];


      document.onkeydown = $.proxy(function (evt) {
        evt = (evt) ? evt : window.event;
        var keyCode = evt.keyCode;
        var charCode = evt.charCode;
        var dir = this.getDir();
        if (this.stopTimer) clearTimeout(this.stopTimer);
        if (keyCode) {
          dir = this.getDir(keyCode.toString());
        }
        if (charCode) {
          dir = this.getDir(charCode.toString());
        }
        if (dir) {
          this.me.setDir(dir);
          this.me.setStatus('move');
        }
        evt.preventDefault();
        return false;
      }, this);

      document.onkeyup = $.proxy(function (evt) {
        if (this.stopTimer) clearTimeout(this.stopTimer);
        this.stopTimer = setTimeout($.proxy(function () {
          this.me.setStatus('stop');
        }, this), 100);
      }, this);

    },

    //    <input type="button" value="==上==" id="up">
    //<input type="button" value="==右==" id="right">
    //<input type="button" value="==下==" id="down">
    //<input type="button" value="==左==" id="left">
    //<input type="button" value="停止" id="stop">
    //<input type="button" value="射击" id="fire">

    events: {
      'click #right': function () {
        this.me.setDir('right');
        this.me.setStatus('move');
      },
      'click #stop': function () {
        this.gameStatus = false;
      }
    },

    rightAction: function () {

    },

    onPreShow: function () {
      this.turning();
    },

    createTank: function () {
      this.me = new MoveObj({
        //把组件放入指定容器，不知道这样对不对。
        wrapper: this.$el.find('#map')
      });
      this.me.show();

      this.GAMEOBJ.push(this.me);
    },

    //游戏时钟，不停的运行，不停的刷新
    gameTick: function () {
      for (var i = 0, len = this.GAMEOBJ.length; i < len; i++) {
        this.GAMEOBJ[i].move();
      }
      if (this.gameStatus) {
        rAF($.proxy(this.gameTick, this));
      }
    },

    //游戏开始
    gameStart: function () {

      //开始游戏计时
      this.gameTick();

    },

    //游戏暂停
    gameStop: function () {

    },

    //游戏结束
    gameOver: function () {

    },

    onShow: function () {

      //创建英雄
      this.createTank();
      this.gameStatus = true;
      this.gameStart();


    },

    onHide: function () {


    }

  });
});
