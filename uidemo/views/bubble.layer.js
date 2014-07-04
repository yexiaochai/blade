define(['View', getViewTemplatePath('bubble.layer'), 'UIBubbleLayer'], function (View, viewhtml, UIBubbleLayer) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);

    },

    events: {
      'click #filter': 'filterAction',
      'click #orderBy': 'orderByAction',

      'click .demo1': 'demo1',
      'click .demo2': 'demo2',
      'click .demo3': 'demo3',
      'click .demo4': 'demo4'
    },

    filterAction: function (e) {
      if(!this.filter) {
        var data = [{ name: '价格/星级' },
          { name: '位置区域' },
          { name: '品牌' },
          { name: '<span>测试</span>'}];


        var el = $(e.currentTarget);
        var index = parseInt(Math.random() * 4);
        var dir = (e.pageY > 200) ? 'down' : 'up';
        this.filter = new UIBubbleLayer({
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
      this.filter.show();
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
