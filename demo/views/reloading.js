define(['View', 'UILoadingLayer', getViewTemplatePath('reloading')], function (View, UIReLoading, viewhtml) {

  return _.inherit(View, {
    onCreate: function () {
      console.log('onCreate');
      this.$el.html(viewhtml);
    },

    events: {
      'click .fxdemo': function () {
        this.showLoading();
        setTimeout($.proxy(function () {
          this.hideLoading();
        }, this), 2000);

      },
      'click .fxdemo01': function () {
        this.showLoading({
          datamodel: {
            content: '我是文字'
          }
        });
        setTimeout($.proxy(function () {
          this.hideLoading();
        }, this), 2000);
      },
      'click .fxdemo02': function () {

        this.showLoading({
          datamodel: {
            content: '',
            closeBtn: true
          }
        });

      },
      'click .fxdemo03': function () {
        this.showLoading({
          datamodel: {
            content: '加载中',
            closeBtn: true
          }
        });
      },

      'click .widget0': function () {
        if (!this.reloading) {
          this.reloading = new UIReLoading({
            datamodel: {
              text: ''
            },
            maskToHide: true
          });
        }

        this.reloading.show();
      },

      'click .widget1': function () {
        if (!this.reloading1) {
          this.reloading1 = new UIReLoading({
            datamodel: {
              text: 'delete'
            },
            needMask: false  //不需要蒙板
          });
        }

        this.reloading1.show();

        setTimeout($.proxy(function () {
          this.reloading1.hide();

        }, this), 2000);

      },

      'click .widget2': function () {
        if (!this.reloading2) {
          this.reloading2 = new UIReLoading({
            datamodel: {
              text: 'delete'
            },
            maskToHide: true
          });
        }

        this.reloading2.show();

        //0.5s后 动态设置数据模型
        setTimeout(function () {
          this.reloading2.setDatamodel('动态的', function () {
            alert('closeing');
            this.hide();
          });
        } .bind(this), 500);
      }
    },

    onPreShow: function () {
      console.log('onPreShow');

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
