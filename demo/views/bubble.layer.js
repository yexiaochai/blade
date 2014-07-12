define(['View', getViewTemplatePath('bubble.layer'), 'UIBubbleLayer'], function (View, viewhtml, UIBubbleLayer) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);

    },

    events: {
      'click #filter': 'filterAction',
      'click #orderBy': 'orderByAction',

      'click .demo1': 'demo1Action',
      'click .demo2': 'demo2Action',
      'click .demo3': 'demo3Action',
      'click .demo4': 'demo4Action'
    },

    filterAction: function () {

    },

    orderByAction: function() {

    },

    demo1Action: function(e) {
      if(!this.demo1) {
        var data = [{ name: '<span class="center">价格/星级</span>' },
          { name: '<span class="center">位置区域</span>' },
          { name: '<span class="center">品牌</span>' },
          { name: '<span class="center">测试</span>'}];


        var el = $(e.currentTarget);
        var index = parseInt(Math.random() * 4);
        var dir = (e.pageY > 200) ? 'down' : 'up';
        this.demo1 = new UIBubbleLayer({
          triggerEl: el,
          datamodel: {
            data: data,
            dir: dir,
            index: index
          },
          onClick:  function (e, data, index, el) {
            console.log(arguments);
            this.setIndex(index);
            this.hide();
          }
        });
      }
      this.demo1.show();
    },

    demo2Action: function(e) {
      if(!this.demo2) {
        var data = [{ name: '<span class="center">价格/星级</span>' },
          { name: '<span class="center">位置区域</span>' },
          { name: '<span class="center">品牌</span>' },
          { name: '<span class="center">测试</span>'}];


        var el = $(e.currentTarget);
        var index = parseInt(Math.random() * 4);
        var dir =  'up' ;
        this.demo2 = new UIBubbleLayer({
          triggerEl: el,
          datamodel: {
            data: data,
            dir: dir,
            index: index
          },
          onClick:  function (e, data, index, el) {
            console.log(arguments);
            this.setIndex(index);
            this.hide();
          }
        });
      }
      this.demo2.show();
    },

    demo3Action: function(e) {
      if(!this.demo3) {
        var data = [{ name: '<span class="center">价格/星级</span>' },
          { name: '<span class="center">位置区域</span>' },
          { name: '<span class="center">品牌</span>' },
          { name: '<span class="center">测试</span>'}];


        var el = $(e.currentTarget);
        var index = parseInt(Math.random() * 4);
        var dir = (e.pageY > 200) ? 'down' : 'up';
        this.demo3 = new UIBubbleLayer({
          triggerEl: el,
          datamodel: {
            data: data,
            dir: dir,
            index: index
          },
          needMask:true,
          onClick:  function (e, data, index, el) {
            console.log(arguments);
            this.setIndex(index);
            this.hide();
          }
        });
      }
      this.demo3.show();
    },

    demo4Action: function(e) {
      if(!this.demo4) {
        var data = [{ name: '<span class="center">普通会员</span>' },
          { name: '<span class="center">vip</span>' },
          { name: '<span class="center">高级vip</span>' },
          { name: '<span class="center">钻石vip</span>'}];


        var el = $(e.currentTarget);
        var index = parseInt(Math.random() * 4);
        var dir = (e.pageY > 200) ? 'down' : 'up';
        this.demo4 = new UIBubbleLayer({
          triggerEl: el,
          datamodel: {
            data: data,
            dir: dir,
            index: index
          },
          onClick:  function (e, data, index, el) {
            console.log(arguments);
            this.setIndex(index);
            this.hide();
          }
        });
      }
      this.demo4.show();
    },

    onPreShow: function () {
      this.turning();
    },

    onShow: function () {
    },

    onHide: function () {
      if(this.demo1 && this.demo1.status == 'show') this.demo1.hide();
      if(this.demo2 && this.demo2.status == 'show') this.demo2.hide();
      if(this.demo3 && this.demo3.status == 'show') this.demo3.hide();
      if(this.demo4 && this.demo4.status == 'show') this.demo4.hide();
    }

  });
});
