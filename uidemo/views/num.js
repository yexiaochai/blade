define(['View', getViewTemplatePath('num'), 'UINum'], function (View, viewhtml, UINum) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);

    },

    events: {

    },

    onPreShow: function () {
      if (!this.num)
        this.num = new UINum({
          wrapper: this.$('.cui-citys-bd')
        });

      this.num.show();

      this.turning();
    },

    onShow: function () {

    },

    onHide: function () {

    }

  });
});
