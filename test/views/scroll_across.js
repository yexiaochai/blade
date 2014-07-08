define(['View', 'UIScroll', getViewTemplatePath('scroll_across')], function (View, UIScroll, viewhtml) {

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
      var s = new UIScroll({
        wrapper: $('#wrapper'),
        scroller: $('#scroller'),
        scrollType: 'x',
        step:100,
        scrollbars:true
      });
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
