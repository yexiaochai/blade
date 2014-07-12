define(['View', getViewTemplatePath('loading'), 'UILoading'], function (View, viewhtml, UILoading) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);

    },

    events: {
      'click .demo1': 'demo1',
      'click .demo2': 'demo2',
      'click .demo3': 'demo3',
      'click .demo4': 'demo4'
    },

    demo1: function () {
      if (!this.loading1) {
        this.loading1 = new UILoading({
          maskToHide: true
        });
      }
      this.loading1.show();
    },

    demo2: function () {
      if (!this.loading2) {
        this.loading2 = new UILoading({
          maskToHide: true
        });
      }
      this.loading2.show();
    },

    demo3: function () {
      if (!this.loading3) {
        this.loading3 = new UILoading({
          needMask: false
        });
      }
      this.loading3.show();
    },

    demo4: function () {
      if (!this.loading4) {
        this.loading4 = new UILoading({
          maskToHide: true
        });
      }
      this.loading4.show();
    },

    onPreShow: function () {
      this.turning();
    },

    onShow: function () {
    },

    onHide: function () {
      if(this.loading1 && this.loading1.status == 'show') this.loading1.hide();
      if(this.loading2 && this.loading2.status == 'show') this.loading2.hide();
      if(this.loading3 && this.loading3.status == 'show') this.loading3.hide();
      if(this.loading4 && this.loading4.status == 'show') this.loading4.hide();
    }

  });
});
