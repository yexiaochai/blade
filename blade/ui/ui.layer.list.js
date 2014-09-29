
define(['UILayer', getAppUITemplatePath('ui.layer.list')], function (UILayer, template) {
  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;
      this.needReposition = false;

      this.datamodel = {
        list: [],
        cancelText: '取消',
        className: 'popup-operate',
        index: -1
      };

      this.events = {
        'click .cancel': 'cancelAction',
        'click .list li': 'itemAction'
      };

      this.onItemAction = function (data, index, e) {
      };

    },

    initialize: function ($super, opts) {
      $super(opts);
    },
    setIndex: function (i) {
      if (i < 0 || i > this.datamodel.list.length) return;
      this.datamodel.index = i;
      this.$('li').removeClass('current');
      this.$('li[data-index="' + i + '"]').addClass("current");
    },

    cancelAction: function (e) {
      this.hide();
    },



    itemAction: function (e) {
      var el = $(e.currentTarget);
      var index = el.attr('data-index');
      var data = this.datamodel.list[index];
      this.setIndex(index);
      this.onItemAction.call(this, data, index, e);

    },

    createHtml: function () {
      return _.template(this.template)(this.datamodel);
    },

    addEvent: function ($super) {
      $super();
      this.on('onCreate', function () {
        this.$el.removeClass('cui-layer');
        this.$el.addClass('popup-operate');

      });

      this.on('onShow', function () {

      });
    }

  });

});
