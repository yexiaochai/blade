define(['View', getViewTemplatePath('lazyload'), 'cLazyload'], function (View, viewhtml, cLazyload) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);

    },

    events: {

    },



    onPreShow: function () {

      if (!this.sss) {
        this.sss = new cLazyload({
          imgs: this.$('img')
        });
      }

      this.turning();


    },

    onShow: function () {

    },

    onHide: function () {
      if (this.sss) this.sss.destroy();
    }

  });
});
