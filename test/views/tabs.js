define(['View', 'UITabs', getViewTemplatePath('tabs')], function (View, UITabs, viewhtml) {

  return _.inherit(View, {
    onCreate: function () {
      console.log('onCreate');
      this.$el.html(viewhtml);
    },

    events: {
      'click .widget0': function (e) {

      },

      'click .back': function () {
        this.back('index');
      }
    },

    onPreShow: function () {
      console.log('onPreShow');
      var uiTab = new UITabs({
        datamodel: {

        },
        wrapper: this.$el.find('.wrapper')
      });
      uiTab.show();
      window.uiTab = uiTab
      this.turning();
    },

    onAfterShow: function () {
      console.log('onAfterShow');
    },

    onHide: function () {
      console.log('onHide');
    }

  });
});
