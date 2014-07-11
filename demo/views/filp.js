define(['View', getViewTemplatePath('filp'), 'UITab'], function (View, viewhtml, UITab) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },

    events: {
      'click .demo1': 'demo1'
    },

    demo1: function () {

    },

    onPreShow: function () {
      var $el = this.$('.flip-content');

      //生成tabs
      if(!this.tab) {
        this.tab = new UITab({
          datamodel: {
            data: [
              { id: 1, name: '美剧' },
              { id: 2, name: '国产' },
              { id: 3, name: '日剧' }
            ]
          },
          wrapper: this.$el.find('.tabs'),
          //tabs点击触发的事件
          onChange: function(data) {
            $el.html(data.name);

            console.log($el, data.name);
          }
        });
        this.tab.show();
      }

      if(!this.flip) {
        _.flip($el, 'left', function() {
          //左滑动，当前tabs加1
          this.tab.setIndex(this.tab.getIndex()+1);
        }.bind(this), null, 0.3);

        //右滑动，当前tabs减1
        _.flip($el, 'right', function() {
          this.tab.setIndex(this.tab.getIndex()-1);
        }.bind(this), null, 0.3);

        //上滑动
        _.flip($el, 'up', function() {
          $el.html('up');
        }.bind(this), null, 0.3);

        //下滑动
        _.flip($el, 'down', function() {
          $el.html('down');
        }.bind(this), null, 0.3);

        this.flip = true;
      }

      this.turning();
    },

    onShow: function () {
    },

    onHide: function () {

    }

  });
});
