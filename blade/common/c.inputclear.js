define([], function () {
  return _.inherit({
    propertys: function () {

    },
    //取当前input的值
    getInputVal: function (val) {
      //      console.log('val:',val);
      return val;
    },
    //设置删除按钮的位置
    setPosition: function (clearBtn) {
      var offset = this.offset;
      if (offset.left) {
        clearBtn.css({
          left: offset.left + 'px',
          right: 'auto'
        });
      }
      if (offset.top) {
        clearBtn.css({
          top: offset.top + 'px',
          bottom: 'auto'
        });
      }
      if (offset.right) {
        clearBtn.css({
          right: offset.right + 'px',
          left: 'auto'
        });
      }
      if (offset.bottom) {
        clearBtn.css({
          bottom: offset.bottom + 'px',
          top: 'auto'
        });
      }
    },

    initialize: function (opts) {
      this.propertys();
      this.handleOpts(opts);
      this.init();
    },

    handleOpts: function (opts) {
      _.extend(this, opts);

      this.clearClass = opts.clearClass || 'close-me';
      this.html = opts.html || '<a class="clear-input close-me" href="javascript:void(0);" style="display:none;"><span></span></a>';

      this.wrapper = opts.wrapper || $('body');
      this.inputs = opts.inputs;

      this.wrapper.append(this.html);
      //删除按钮的callback
      this.clearCallback = opts.clearCallback;

    },

    init: function () {
      this.bindEvents();
    },

    bindEvents: function () {
      var scope = this,
          $inputClear = scope.wrapper.find('.' + scope.clearClass),
          $currentInput;  //当前input

      this.wrapper.on('focus', this.inputs, function () {
        $inputClear.show();  //先show才能获取删除按钮的高度和宽度
        var offset = $(this).offset(),
            left = offset.left,
            top = offset.top,
            width = offset.width,
            height = offset.height,
            $inputClearWidth = $inputClear.width(),
            $inputClearHeight = $inputClear.height();

        scope.offset = { left: left + width - $inputClearWidth, top: top + height / 2 - $inputClearHeight / 2 };
        scope.setPosition($inputClear);
        $currentInput = $(this);
      }).on('focusout', this.inputs, function () {
        $inputClear.hide();
      }).on('input', this.inputs, function () {
        if ($(this).val() != '') {
          $inputClear.show();
        } else {
          $inputClear.hide();
        }
      });

      //删除按钮的callback
      $inputClear.click(function (e) {
        $target = $(e.currentTarget);
        $currentInput.val('');

        typeof scope.clearCallback == 'function' && scope.clearCallback.call($target);
        $target.hide();
      });


    }

  });

});
