define(['View', getViewTemplatePath('inputclear'), 'UIInputClear'], function (View, viewhtml, UIInputClear) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },

    events: {
      'focus .demo1': 'demo1Action',
      'click .new-input': 'newInput'
    },

    demo1Action: function () {

    },

    newInput: function () {
      this.$('.parent-div').append('' +
          '<div class="demo1div pos-rel input-div">' +
          '<input type="text" class="demo1 d-input"  value=""/>' +
          '</div>');
    },

    onPreShow: function () {
    
      this.turning();
    },

    onShow: function () {

      if (!this.inputClear1) {

        this.inputClear1 = new UIInputClear({
          triggerEl: this.$('.demo1')

        });

//        this.inputClear1.show();

      }


    },

    onHide: function () {

    }

  });
});
