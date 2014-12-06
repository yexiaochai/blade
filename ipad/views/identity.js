/**
 * Created by huangjianhua on 14-3-5.
 */
define(['View', getViewTemplatePath('identity'), 'UIIdentitycard'], function (View, html, UIIdentitycard) {
  "use strict";

  var View = _.inherit(View, {
    render: function () {
      this.$el.html(html);
    },

    onCreate: function () {
      this.render();
    },

    events: {
      'click #num-card1': function () {
        if (this.identity) this.identity.hide();
        if (!this.card) {
          var targetEl = $('#num-card');
          this.card = new UIIdentitycard({
            template: '<div class="cui-keyboard cui-keyboard-hide"><div class="cui-hd"><span>完成</span></div><div class="cui-bd"><ul><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>0</li><li style="width: 63%;" class="cui-wrapper-delete"><div class="cui-btn-delete"></div></li></ul></div></div>',
            targetEl: targetEl,
            itemClickAction: function (val) {
              var num = targetEl.html() + val.toString();
              num = num.replace(/\s*/g, "");
              if (num.length > 16) return;
              targetEl.html(this._handleNum(num));
            },
            deleteAction: function () {
              var num = targetEl.html();
              num = num.replace(/\s*/g, "");

              targetEl.html(this._handleNum(num.substr(0, num.length - 1)));
            },
            _handleNum: function (num) {
              var numStr = '', i = 0, len = 0;
              //首先取数据时候，做替换；其次再做样式替换
              len = num.length;
              for (i; i < len; i++) {
                numStr = numStr + num[i];
                if (i > 0 && i < (len - 1) && ((i + 1) % 4 == 0))
                  numStr = numStr + ' ';
              }
              return numStr;
            }
          });
        }
        this.card.show();
      },
      'click #form-detail': function (e) {
        if (this.card) this.card.hide();
        if (!this.identity) {
          var targetEl = $('#IDENTITY-CARD');
          this.identity = new UIIdentitycard({
            targetEl: targetEl,
            itemClickAction: function (val) {
              var num = targetEl.html() + val.toString();
              num = num.replace(/\s*/g, "");
              if (num.length > 16) return;
              targetEl.html(this._handleNum(num));
            },
            deleteAction: function () {
              var num = targetEl.html();
              num = num.replace(/\s*/g, "");

              targetEl.html(this._handleNum(num.substr(0, num.length - 1)));
            },
            _handleNum: function (num) {
              var numStr = '', i = 0, len = 0;
              //首先取数据时候，做替换；其次再做样式替换
              len = num.length;
              for (i; i < len; i++) {
                numStr = numStr + num[i];
                if (i > 0 && i < (len - 1) && ((i + 1) % 4 == 0))
                  numStr = numStr + ' ';
              }
              return numStr;
            }
          });
        }
        this.identity.show();
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

  return View;

});