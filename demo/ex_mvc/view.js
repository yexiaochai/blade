define(['AbstractView'], function (AbstractView) {

  return _.inherit(AbstractView, {

    propertys: function ($super) {
      $super();

    },

    initialize: function ($super, app, id) {
      $super(app, id);
    },

    onPreShow: function ($super) {
      $super();

    },

    show: function ($super) {
      $super();
      hljs.initHighlightingOnLoad();

    }


  });

});
