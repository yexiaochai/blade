"use strict"
define(['View', 'UILayerList', getViewTemplatePath('layerlist')], function (View, UILayerList, html) {
  var s = null;

  var View = _.inherit(View, {
    render: function () {
      this.$el.html(html);
    },

    onCreate: function () {
      this.render();
    },

    events: {
      'click .demo': function () {
        var scope = this;
        if (!this.list) {
          var data = [];

          for (var i = 0; i < 4; i++) {
            data.push({ name: '更多操作' + i });
          }

          this.list = new UILayerList({
            datamodel: {
              list: data
            },
            onItemAction: function (item) {
              scope.$('.listSec').html(item.name);
              this.hide();
            },
            animateShowAction: function (el) {
              el.css('bottom', '-100%');
              el.show();
              el.animate({ bottom: 0 }, 300);

            },
            animateHideAction: function (el) {
              el.animate({ 'bottom': '-100%'}, 300, function () {
                el.hide();
              });
            }
          });
        }

        this.list.show();
      }
    },

    onPreShow: function () {
      //对HeaderView设置数据

      this.turning();
    },

    onShow: function () {

    },

    onHide: function () {

    }

  });

  return View;

});