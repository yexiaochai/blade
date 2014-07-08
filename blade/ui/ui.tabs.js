define(['UIView', getAppUITemplatePath('ui.tabs')], function (UIView, template) {
  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;

      this.datamodel = {
        data:  [
          { id: 1, name: '中国' },
          { id: 2, name: '美国' },
          { id: 3, name: '英国' }
        ],
        selectedKey: 2
      };

      this.events = {
        'click .cui-tab-mod li': 'selectAction'
      };

    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    selectAction: function(e) {
      this.$el.find('li').removeClass('cui-tab-current');  //清除样式
      var $target = $(e.target),selectedInfo = {};
      $target.addClass('cui-tab-current');
      selectedInfo.id = $target.attr('data-key');   //获取信息
      selectedInfo.value= $target.html();
      this.changed(selectedInfo);      //change事件可供重写
    },

    changed: function (selectedInfo) {
      console.log('change',selectedInfo);
    },

    initElement: function () {
      this.el = this.$('.cui-tab-mod');
    },

    getVal: function() {
      return this.datamodel.selectedKey;
    },

    setVal: function(i) {
      if(i > 0 || i < this.datamodel.data.length)
      this.datamodel.selectedKey = i;
    },

    addEvent: function ($super) {
      $super();
      this.on('onCreate', function () {
        console.log('tab oncreate');
      });

    }

  });
});