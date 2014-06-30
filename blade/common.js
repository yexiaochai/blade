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
      'UIAlert': app + 'ui/ui.alert',
      'UIMask': app + 'ui/ui.mask',
      'UILoading': app + 'ui/ui.loading',
      'UIReLoading': app + 'ui/ui.reloading',
      'UIToast': app + 'ui/ui.toast',
      'UIInlineView': app + 'ui/ui.inline.view',
      'UINum': app + 'ui/ui.num',
      'UISwitch': app + 'ui/ui.switch',
      'UIBubbleLayer': app + 'ui/ui.bubble.layer',
      'UITab': app + 'ui/ui.tabs'


    }

  });

})();