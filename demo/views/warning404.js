define(['View', getViewTemplatePath('warning404'), 'UIGroupList', 'UIWarning404'], function (View, viewhtml, UIGroupList, UIWarning404) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
      this.initElement();

      this.TXTTIMERRES = null;

    },

    initElement: function () {
      this.cancelBtn = this.$('.cui-btn-cancle');
      this.searchBox = this.$('.cui-input-box');
      this.txtWrapper = this.$('.cui-citys-hd');
      this.searchList = this.$('.seach-list');

    },

    events: {
      'click .fxdemo': function () {
        var scope = this;
        this.showToast('正在更新...');
        
      },
      'click .fxdemo01': function () {
        var scope = this;
        this.showToast('正在更新...');

      },
      'click .demo1': function () {
        if (!this.layer404) {
          this.layer404 = new UIWarning404({
            wrapper: this.$('.warningWrapper')

          });
        }
        this.layer404.show();
      }
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
