define(['View', getViewTemplatePath('inputclear'), 'cInputclear'], function (View, viewhtml, cInputclear) {

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

    newInput: function() {
      this.$('.parent-div').append('<input type="text" class="demo1 d-input my-input"  value=""/>');
    },

    onPreShow: function () {
      if(!this.inputClear1) {
        this.inputClear1 = new cInputclear({
          wrapper: this.$el,
//          inputs: "input[type='text']",  //要input  dom名字，可class，id，或者标签名字、类型
          inputs: ".my-input",
          clearCallback: function() {
            console.log('i am clearCallback');
          }
        });
      }



      this.turning();
    },

    onShow: function () {
    },

    onHide: function () {

    }

  });
});
