//游戏时钟对象，相当于控制器
define([], function () {

  return _.inherit({
    propertys: function ($super) {
    },

    setOption: function (options) {
      for (var k in options) {
        this[k] = options[k]
      }
    },
    initialize: function (opts) {
      this.propertys();
      this.setOption(opts);

    }

  });

});
