(function () {

  var app = 'blade/';

  window.getAppUITemplatePath = function (path) {
    return 'text!blade/ui/' + path + '.html'; 
  }

  require.config({
    shim: {
      _: {
        exports: '_'
      }
    },
    paths: {
      'text': app + 'libs/require.text',

      //核心MVC
      'App': app + 'mvc/abstract.app',
      'View': app + 'mvc/abstract.view',


      //UI组件
      'UIBase': app + 'mvc/ui.base',
      'UIView': app + 'ui/ui.abstract.view',
      'UILayer': app + 'ui/ui.layer',
      'UIAlert': app + 'ui/ui.alert'


    }

  });

})();