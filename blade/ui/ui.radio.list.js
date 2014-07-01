define(['UILayer', getAppUITemplatePath('ui.radio.list'), 'UIScroll'], function (UILayer, template, UIScroll) {


  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;


      var data = [];
      for (var i = 0; i < 15; i++) {
        data.push({ id: '列表选项' + (i + 1) });
      }

      this.datamodel = {
        title: '标题',
        data: data,
        index: 1
      };

      this.itemNum = this.datamodel.data.length;

      this.displayNum = 5;

      this.scroll = null;

      this.events = {
        'click .cui-select-view> li': 'clickAction'
      };

      this.onClick = function (e, data) {
        console.log(data);
      };

    },

    clickAction: function (e) {
      var el = $(e.currentTarget)
      var i = el.attr('data-index');
      console.log(i);
      this.datamodel.index = i;
      //这里不以datamodel改变引起整个dom变化了，不划算
      this.$('.cui-select-view li').removeClass('current');
      el.addClass('current');
      //      this.hide();

      if (this.onClick) this.onClick.call(this, e, this.datamodel.data[i]);

    },

    initElement: function () {
      this.swrapper = this.$('.cui-bd');
      this.scroller = this.$('.cui-select-view');

    },

    initSize: function () {
      var num = this.displayNum
      this.sheight = this.scroller.height();
      this.itemHeight = parseInt(this.sheight / this.itemNum);
      if (num > this.itemNum) num = this.itemNum;
      this.swrapper.height(this.itemHeight * num);


    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    addEvent: function ($super) {
      $super();
      this.on('onShow', function () {
        this.initSize();
        if (this.itemNum > this.displayNum) {
          this.scroll = new UIScroll({
            wrapper: this.swrapper,
            scroller: this.scroller
          });

          var index = this.datamodel.index
          if (this.itemNum - index < this.displayNum) index = this.itemNum - this.displayNum;

          var _top = (this.itemHeight * index) * (-1);
          this.scroll.scrollTo(0, _top);
        }

      }, 1);

      this.on('onHide', function () {
        if (this.scroll) {
          this.scroll.destroy();
          this.scroll = null;
        }
      });
    }

  });


});
