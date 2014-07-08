
(function () {

  window.getViewTemplatePath = function (path) {
    return 'text!test/templates/' + path + '.html';
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
      'viewRootPath': 'test/views/'
    });

  });
})();


