
define(['UIView', getAppUITemplatePath('ui.inputclear'), 'UIInputClear'], function (UIView, template, UIInputClear) {

  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;

      this.datamodel = {
        parent: 'body',                       //父级，就是为了委托绑定；
        container: '',                        //容器
        offset: {},                           // 相对input的位置
        clearClass: '.clear-input',         //删除按钮样式class的名称
        clearEventClass : '.close-me'     //默认事件绑定class
      };

      //删除按钮的callback事件
      clearCallback = function() {

      }

    },
    //取当前input的值
    getInputVal: function(val) {
//      console.log('val:',val);
      return val;
    },
    //设置删除按钮的位置
    setPosition: function(clearBtn) {
      var offset = this.datamodel.offset;
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

    initialize: function ($super, opts) {
      $super(opts);
    },

    initElement: function () {

    },

    addEvent: function ($super) {
      $super();
      var clearClass = this.datamodel.clearClass,
          defaultClearClass = '.clear-input';   //默认样式class

      this.on('onCreate', function() {
        var $inputs =$(this.datamodel.parent).find(this.datamodel.container),
            scope = this;

        $inputs.each(function() {
          var $input = $(this),
              clearBtn = scope.$(defaultClearClass).clone();   //clone一个dom

          //设置删除按钮的位置
          scope.setPosition(clearBtn);

          //input后面添加一个删除按钮
          $input.after(clearBtn);
          //如果存在自定义的clearClass
          if(clearClass != defaultClearClass) {
            clearBtn.addClass(clearClass.replace('.',''));
          }

        });

        //父节点绑定事件。
        //input事件
        var container = this.datamodel.container;
        $(scope.datamodel.parent).on('input', container, function(e) {
          var $target = $(e.currentTarget);
          if($target.val() == '') {
            $target.next(clearClass).hide();
          } else {
            $target.next(clearClass).show();
            scope.getInputVal($target.val());   //取input的值
          }
        }).on('focus', container, function(e) {
           var $target = $(e.currentTarget);
              //判断是否新增的input
              if(!$target.next(defaultClearClass).length) {
                var clearBtn = scope.$(defaultClearClass).clone();
                if(clearClass != defaultClearClass) {
                  clearBtn.addClass(clearClass.replace('.', '')).removeClass('close-me');   //添加自定义class，移除默认事件class
                }
                //设置删除按钮的位置
                scope.setPosition(clearBtn);
                $target.after(clearBtn);
              }
              //如果为input的类容为空则隐藏删除按钮(不作trim处理)
              if($target.val() != '') {
                $target.next(defaultClearClass).show();
                scope.getInputVal($target.val());   //取input的值
              }
        }).on('focusout', container, function(e) {
              var $target = $(e.currentTarget);
              //500毫秒后隐藏
              setTimeout(function() {
                $target.next(defaultClearClass).hide();
              }, 500);
        });

        //点击删除
        if(scope.datamodel.parent) {
          //防止重复绑定事件, 如果样式class不等于默认class则移除  默认事件绑定的class
          if(scope.datamodel.clearClass != '.clear-input') {
            $(scope.datamodel.clearClass).removeClass('close-me');            //移除默认事件class
            scope.datamodel.clearEventClass = scope.datamodel.clearClass;  //自定义的样式class为默认事件class
          }

          $(scope.datamodel.parent).on( 'click', scope.datamodel.clearEventClass, function(e) {
            var $target = $(e.currentTarget);
            scope.getInputVal($target.prev('input').val());   //取input的值
            $target.prev('input').val('');
            $target.hide();

            typeof scope.clearCallback == 'function' && scope.clearCallback.call($target);

          });

        }
      });
    }
  });

});
