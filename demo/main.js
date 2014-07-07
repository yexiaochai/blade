
(function () {
  var project = 'demo';

  window.getViewTemplatePath = function (path) {
    return 'text!' + project + '/templates/' + path + '.html';
  }

  require.config({
    baseUrl: '../',
    paths: {
    }
  });

  require(['App'], function (App) {
    //实例化App
    var app = new App({
      'defaultView': 'index',
      'viewRootPath': '' + project + '/views/',
      animations: {
        slideleft: function (inView, outView) {


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
            inView.$el.removeClass('animatestart');
            outView.hide();
          });


        },
        slideright: function (inView, outView) {
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
            outView.$el.removeClass('animatestart');
            outView.hide();
          });
        }
      }
    });

  });
})();


