define(['View', getViewTemplatePath('warning404'), 'UIGroupList', 'UIPageview', 'UIWarning404'], function (View, viewhtml, UIGroupList, UIPageView, UIWarning404) {

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
        this.showWarning404(function () {
          scope.showToast('刷新页面');
          //注意这里注意关闭404的方法
          scope.hideWarning404();
        },
  function () {
    //注意因为pageview组件共享框架的zindex，所以这里的toast层级比404低，显示不出来
    scope.showToast('pageview显示');
  }, function () {
    scope.showToast('pageview隐藏');
  },
  false,
  function () {
    scope.showToast('telAction');
  });
      },
      'click .fxdemo01': function () {
        var scope = this;
        this.showWarning404(function () {
          scope.showToast('刷新页面');
          //注意这里注意关闭404的方法
          scope.hideWarning404();
        }, null, null, 'right');
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
      this.hideWarning404();
    }

  });
});
