define(['View', getViewTemplatePath('scroll.layer'), 'UIScrollLayer'], function (View, viewhtml, UIScrollLayer) {
  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },
    events: {
      'click .demo1': 'demo1',
      'click .demo2': 'demo2'
    },
    demo1: function () {
      if (!this.scrollLayer) {
        var html = '';
        for(var i=0;i<40;i++) {
          html += '<p>this is scrollLayer'+ i +'</p>';
        }
        this.scrollLayer = new UIScrollLayer({
          maxHeight: 400,  
          html: '<div class="s-tpl">'+ html +'</div>',
          okAction: function() {
            console.log('that\'s ok');
            this.hide();
          },
          cancelAction: function() {
            console.log('that\'s cancel');
            this.hide();
          }
        });
      }
      this.scrollLayer.show();
    },
    demo2: function () {
      if (!this.scrollLayer2) {
        var html = '';
        for(var i=0;i<40;i++) {
          html += '<p>项目'+ i +'</p>';
        }
        this.scrollLayer2 = new UIScrollLayer({
          maxHeight: 400,
          html: '<div class="s-tpl">'+ html +'</div>',
          datamodel: {
            title: '测试',
            btns: [
              { name: '取消', className: 'cui-btns-cancel' },
              { name: '确定', className: 'cui-btns-ok' }
            ]
          },
          events: {
            'click .cui-btns-ok': 'myOkAction',
            'click .cui-btns-cancel': 'myCancelAction',
            'click .cui-top-close': 'myCloseAction'
          },
          myOkAction: function() {
            console.log('my ok');
            this.hide();
          },
          myCancelAction: function() {
            console.log('my cancel');
            this.hide();
          },
          myCloseAction: function() {
            console.log('my close');
            this.hide();
          }
        });
      }
      this.scrollLayer2.show();
    },
    onPreShow: function () {
      this.turning();
    },
    onShow: function () {
    },
    onHide: function () {
    }
  });
});