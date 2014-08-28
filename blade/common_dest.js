(function () {

  var app = '';

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

      //UI组件
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
      'UITab': app + 'ui/ui.tab',
      'UIScroll': app + 'ui/ui.scroll',
      'UIScrollLayer': app + 'ui/ui.scroll.layer',
      'UIRadioList': app + 'ui/ui.radio.list',
      'UISelect': app + 'ui/ui.select',
      'UIGroupSelect': app + 'ui/ui.group.select',
      'UIGroupList': app + 'ui/ui.group.list',
      'UICalendar': app + 'ui/ui.calendar',
      'UISlider': app + 'ui/ui.slider'

    }

  });

})();