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

    newInput: function() {
      this.$('.parent-div').append('' +
          '<div class="demo1div pos-rel input-div">' +
          '<input type="text" class="demo1 d-input"  value=""/>' +
          '</div>');
    },

    onPreShow: function () {
      if(!this.inputClear1) {
        this.inputClear1 = new UIInputClear({
          datamodel: {
            container: '.demo1',
            offset: {

            },
            parent:'.parent-div',
            clearClass: '.my-clear'

          },
          clearCallback: function() {
            console.log('clearCallback');
            alert('i am clearCallback');
          }
        });

      }

      if(!this.inputClear2) {
        this.inputClear2 = new UIInputClear({
          datamodel: {
            container: '.demo2',
            offset: {

            }

          },
          clearCallback: function() {
            console.log('页面加载后不需要再生成input');
            alert('页面加载后不需要再生成input');
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
