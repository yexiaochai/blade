define(['View', 'UITab', getViewTemplatePath('tab')], function (View, UITab, viewhtml) {

  return _.inherit(View, {
    onCreate: function () {
      console.log('onCreate');
      this.$el.html(viewhtml);
      this.tab = null;
      this.tab1 = null;
    },

    events: {
      'click .widget0': function (e) {

      },

      'click .back': function () {
        this.back('index');
      }
    },

    onPreShow: function () {
      console.log('onPreShow');
      //简单初始化
      if(!this.tab) {
        this.tab = new UITab({
          datamodel: {

          },
          wrapper: this.$el.find('.wrapper')
        });
        this.tab.show();
      }

      //设置参数，重写change
      if(!this.tab1) {
        this.tab1 = new UITab({
          datamodel: {
            data: [
              { id: 1, name: 'heartbeats' },
              { id: 2, name: 'silence' },
              { id: 3, name: 'dying in the sun' },
              { id: 4, name: 'love story' }
            ],
            curClass: 'cui-tab-current',
            index: 0
          },
          onChange: function() {
            console.log('onChange myself:' + this.el.attr('data-key')+ this.el.html() );
          },
          wrapper: this.$el.find('.wrapper1')
        });
        this.tab1.show();
      }


      this.turning();
    },

    onAfterShow: function () {
      console.log('onAfterShow');
    },

    onHide: function () {
      console.log('onHide');
    }

  });
});
