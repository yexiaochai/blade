(function () {

  //项目根路径，这个会跟着外层入口index.html而变化
  var app = './blade/';
  //模板路径

  require.config({
    shim: {
      _: {
        exports: '_'
      }
    },
    paths: {
      'text': app + 'libs/require.text',
      'AbstractApp': app + 'mvc/abstract.app',

      //抽象view
      'UIView': app + 'ui/ui.abstract.view',
      'C_UIView': app + 'ui/ui.abstract.view.css',

      //alert组件
      'UIAlert': app + 'ui/ui.alert',
      'T_UIAlert': app + 'ui/ui.alert.html',

      //气泡组件
      'UIBubbleLayer': app + 'ui/ui.bubble.layer',
      'T_UIBubbleLayer': app + 'ui/ui.bubble.layer.html',
      'C_UIBubbleLayer': app + 'ui/ui.bubble.layer.css',

      //日历
      'UICalendar': app + 'ui/ui.calendar',
      'T_UICalendar': app + 'ui/ui.calendar.html',
      'C_UICalendar': app + 'ui/ui.calendar.css',

      //分组列表
      'UIGroupList': app + 'ui/ui.group.list',
      'T_UIGroupList': app + 'ui/ui.group.list.html',
      'C_UIGroupList': app + 'ui/ui.group.list.css',

      //头部组件
      'UIHeader': app + 'ui/ui.header',
      'T_UIHeader': app + 'ui/ui.header.html',
      'C_UIHeader': app + 'ui/ui.header.css',

      //身份证组件
      'UIIdentitycard': app + 'ui/ui.identitycard',
      'T_UIIdentitycard': app + 'ui/ui.identitycard.html',
      'C_UIIdentitycard': app + 'ui/ui.identitycard.css',

      //图片轮播
      'UIImageSlider': app + 'ui/ui.image.slider',

      //弹出层基类
      'UILayer': app + 'ui/ui.layer',
      'T_UILayer': app + 'ui/ui.layer.html',
      'C_UILayer': app + 'ui/ui.layer.css',

      //底部弹出层列表
      'UILayerList': app + 'ui/ui.layer.list',
      'T_UILayerList': app + 'ui/ui.layer.list.html',
      'C_UILayerList': app + 'ui/ui.layer.list.css',

      //loading弹出层
      'UILoadingLayer': app + 'ui/ui.loading.layer',
      'T_UILoadingLayer': app + 'ui/ui.loading.layer.html',
      'C_UILoadingLayer': app + 'ui/ui.loading.layer.css',

      //蒙版
      'UIMask': app + 'ui/ui.mask',
      'C_UIMask': app + 'ui/ui.mask.css',

      //数字组件
      'UINum': app + 'ui/ui.num',
      'T_UINum': app + 'ui/ui.num.html',
      'C_UINum': app + 'ui/ui.num.css',

      //可拖动选择弹出层
      'UIRadioList': app + 'ui/ui.radio.list',
      'T_UIRadioList': app + 'ui/ui.radio.list.html',

      //IScroll滚动基类
      'UIScroll': app + 'ui/ui.scroll',

      //滚动容器层
      'UIScrollLayer': app + 'ui/ui.scroll.layer',
      'T_UIScrollLayer': app + 'ui/ui.radio.layer.html',

      //select组件
      'UISelect': app + 'ui/ui.select',
      'T_UISelect': app + 'ui/ui.select.html',
      'C_UISelect': app + 'ui/ui.select.css',

      //slider横向滚动组件
      'UISlider': app + 'ui/ui.slider',
      'T_UISlider': app + 'ui/ui.slider.html',
      'C_UISlider': app + 'ui/ui.slider.css',

      //switch组件
      'UISwitch': app + 'ui/ui.switch',
      'T_UISwitch': app + 'ui/ui.switch.html',
      'C_UISwitch': app + 'ui/ui.switch.css',

      //tab组件
      'UITab': app + 'ui/ui.tab',
      'T_UITab': app + 'ui/ui.tab.html',
      'C_UITab': app + 'ui/ui.tab.css',

      //toast提升
      'UIToast': app + 'ui/ui.toast',
      'T_UIToast': app + 'ui/ui.toast.html',
      'C_UIToast': app + 'ui/ui.toast.css',

      //404提示
      'UIWarning404': app + 'ui/ui.warning404',
      'T_UIWarning404': app + 'ui/ui.warning404.html',
      'C_UIWarning404': app + 'ui/ui.warning404.css',



      'cHighlight': app + 'common/c.highlight',
    }

  });

})();