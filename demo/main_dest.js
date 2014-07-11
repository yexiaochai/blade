
(function () {
  var project = '';

  window.getViewTemplatePath = function (path) {
    return 'text!' + project + 'templates/' + path + '.html';
  }

  require.config({
    baseUrl: '../',
    paths: {
      'View': project + 'ex_mvc/view'
    }
  });

  var animations = {
    slideleft: function (inView, outView, callback) {
      var self = this;
      inView.$el.addClass('animatestart');
      inView.show();

      inView.$el.css({
        '-webkit-transform': 'translate3d(100%, 0px, 0px)',
        '-moz-transform': 'translate3d(100%, 0px, 0px)'
      });

      inView.$el.animate({
        '-webkit-transform': 'translate3d(0px, 0px, 0px)',
        '-moz-transform': 'translate3d(0px, 0px, 0px)'
      }, 300, 'linear', function () {
        inView.$el.removeAttr('style');
        outView.$el.removeAttr('style');

        inView.$el.removeClass('animatestart');
        inView.$el.removeAttr('style');
        outView.$el.removeAttr('style');
        outView.hide();

        callback && callback.call(self, inView, outView);

      });

    },

    slideright: function (inView, outView, callback) {
      var self = this;
      inView.show();
      outView.$el.addClass('animatestart');
      outView.$el.css({
        '-webkit-transform': 'translate3d(0%, 0px, 0px)',
        '-moz-transform': 'translate3d(0%, 0px, 0px)'
      });

      outView.$el.animate({
        '-webkit-transform': 'translate3d(100%, 0px, 0px)',
        '-moz-transform': 'translate3d(100%, 0px, 0px)'
      }, 300, 'linear', function () {
        inView.$el.removeAttr('style');
        outView.$el.removeAttr('style');

        outView.$el.removeClass('animatestart');
        outView.hide();

        callback && callback.call(self, inView, outView);

      });
    },

    slideleft: function (inView, outView, callback, scope) {
      $('body').addClass('hiddenx');
      inView.$el.addClass('animatestart');
      inView.$el.addClass('sliderightin');

      inView.show();

      var self = this;
      return setTimeout(function () {
        $('body').removeClass('hiddenx');
        inView.$el.removeClass('animatestart');
        inView.$el.removeClass('sliderightin');

        outView.hide();

        callback && callback.call(scope, inView, outView);

      }, 340);
    },

    slideright: function (inView, outView, callback, scope) {
      $('body').addClass('hiddenx');

      outView.$el.addClass('animatestart');
      outView.$el.addClass('sliderightout');

      inView.show();

      var self = this;
      return setTimeout(function () {
        $('body').removeClass('hiddenx');
        outView.$el.removeClass('animatestart');
        outView.$el.removeClass('sliderightout');
        outView.hide();

        callback && callback.call(scope, inView, outView);

      }, 340);
    }
  };

  require(['AbstractApp'], function (App) {
    //实例化App
    var app = new App({
      //选择pushState还是hashChange
      hasPushState: false,
      'defaultView': 'index',
      'viewRootPath': '' + project + 'views/',
      animations: animations
    });
    $.bindFastClick && $.bindFastClick();

  });
})();


