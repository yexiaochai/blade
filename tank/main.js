
(function () {

  window.getViewTemplatePath = function (path) {
    return 'text!tank/templates/' + path + '.html';
  }

  require.config({
    baseUrl: '../',
    paths: {
      'MoveObj': 'tank/common/move.obj',
      'Tank': 'tank/common/tank',
      'NPCTank': 'tank/common/npc.tank',
      'Bullet': 'tank/common/bullet',
      'Boom': 'tank/common/boom'

    }
  });

  require(['AbstractApp'], function (App) {
    //实例化App
    var app = new App({
      hasPushState: true,
      'defaultView': 'index',
      'viewRootPath': 'tank/views/'
    });

  });
})();


