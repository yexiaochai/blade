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
          maxHeight: 400,  //鍑虹幇scroll鐨勬渶澶ч珮搴?
          html: '<div class="s-tpl">'+ html +'</div>'
        });
      }
      this.scrollLayer.show();
    },
    demo2: function () {
      if (!this.scrollLayer2) {
        var html = '';
        for(var i=0;i<40;i++) {
          html += '<p>鏈嶅姟璐?+ i +'</p>';
        }
        this.scrollLayer2 = new UIScrollLayer({
          maxHeight: 400,
          html: '<div class="s-tpl">'+ html +'</div>',
          datamodel: {
            title: '鏀惰垂鏄庣粏',
            btns: [
              { name: '鍙栨秷', className: 'cui-btns-cancel' },
              { name: '纭畾', className: 'cui-btns-ok' }
            ]
          },
          //閲嶆柊缁戝畾浜嬩欢
          events: {
            'click .cui-btns-ok': 'myOkAction',
            'click .cui-btns-cancel': 'myCancelAction',
            'click .cui-top-close': 'myCloseAction'
          },
          //鍒嗗埆閲嶅啓涓変釜鎸夐挳浜嬩欢
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