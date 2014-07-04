
(function () {
  var project = 'uidemo';

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
      'viewRootPath': '' + project + '/views/'
    });

  });
})();


