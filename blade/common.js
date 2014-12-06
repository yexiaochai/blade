(function () {

  var app = './blade/';

  window.getAppUITemplatePath = function (path) {
    return 'text!' + app + 'ui/' + path + '.html'; 
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
      'AbstractApp': app + 'mvc/abstract.app',
      'AbstractView': app + 'mvc/abstract.view',

      'cLazyload': app + 'common/c.lazyload',
      'cValidate': app + 'common/c.validate',
      'cHighlight': app + 'common/c.highlight',
      'cInputclear': app + 'common/c.inputclear',

      //UI组件
      'UIView': app + 'ui/ui.abstract.view',
      'UILayer': app + 'ui/ui.layer',
      'UIAlert': app + 'ui/ui.alert',
      'UIMask': app + 'ui/ui.mask',
      'UILoading': app + 'ui/ui.loading',
      'UILoadingLayer': app + 'ui/ui.loading.layer',
      'UIToast': app + 'ui/ui.toast',



      'T_UIToast': app + 'ui/ui.toast.html',

//      'T_UIToast': 'http://localhost:5389/blade/demo/templates/toast.html',


      'UIInlineView': app + 'ui/ui.inline.view',
      'UINum': app + 'ui/ui.num',
      'UISwitch': app + 'ui/ui.switch',
      'UIBubbleLayer': app + 'ui/ui.bubble.layer',
      'UITab': app + 'ui/ui.tab',
      'UIScroll': app + 'ui/ui.scroll',
      'UIScrollLayer': app + 'ui/ui.scroll.layer',
      'UIRadioList': app + 'ui/ui.radio.list',
      'UISelect': app + 'ui/ui.select',
      'UIGroupSelect': app + 'ui/ui.group.select',
      'UIGroupList': app + 'ui/ui.group.list',
      'UICalendar': app + 'ui/ui.calendar',
      'UISlider': app + 'ui/ui.slider',
      'UIImageSlider': app + 'ui/ui.image.slider',


      'UIIdentitycard': app + 'ui/ui.identitycard',
      'UILayerList': app + 'ui/ui.layer.list',

      'UIHeader': app + 'ui/ui.header',


      'UIInputClear': app + 'ui/ui.inputclear',
      'UIWarning404': app + 'ui/ui.warning404'


    }

  });

})();