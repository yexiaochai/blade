
(function () {
  var project = 'demo/';

  window.getViewTemplatePath = function (path) {
    return 'text!' + project + 'views/' + path + '.html';
  };



  require.config({
    baseUrl: '../',
    paths: {
      'View': project + 'ex_mvc/view'
    }
  });

  var animations = {

    slideleft: function (inView, outView, callback, scope) {
      $('body').addClass('hiddenx');

      outView.show();
      inView.show();

      inView.$el.addClass('animatestart1 tview');
      outView.$el.addClass('animatestart1 lview');

      inView.$el.addClass('cm-page--right-in');
      outView.$el.addClass('cm-page--left-out');

      inView.$el.one('webkitAnimationEnd transitionend oTransitionEnd', function () {
        $('body').removeClass('hiddenx');

        outView.hide();

        inView.$el.removeClass('animatestart1 tview');
        inView.$el.removeClass('cm-page--right-in');

        outView.$el.removeClass('animatestart1 lview');
        outView.$el.removeClass('cm-page--left-out');


        callback && callback.call(scope, inView, outView);

      }, 340);
    },

    slideright: function (inView, outView, callback, scope) {
      $('body').addClass('hiddenx');

      outView.show();
      inView.show();

      inView.$el.addClass('animatestart1 lview');
      outView.$el.addClass('animatestart1 tview');

      inView.$el.addClass('cm-page--left-in');
      outView.$el.addClass('cm-page--right-out');

      outView.$el.one('webkitAnimationEnd transitionend oTransitionEnd', function () {
        $('body').removeClass('hiddenx');
        outView.hide();

        inView.$el.removeClass('animatestart1 lview');
        inView.$el.removeClass('cm-page--left-in');

        outView.$el.removeClass('animatestart1 tview');
        outView.$el.removeClass('cm-page--right-out');

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

    window.Blade = app;

    $.bindFastClick && $.bindFastClick();

  });
})();


