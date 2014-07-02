define(['UILayer', getAppUITemplatePath('ui.group.select'), 'UIScroll'], function (UILayer, template, UIScroll) {


  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();
      //html模板
      this.template = template;

      var data1 = [];
      var data2 = [];

      for (var i = 0; i < 10; i++) {
        data1.push({ id: 'q_' + i, name: '项目_' + i });
      }

      for (var i = 0; i < 10; i++) {
        data2.push({ id: 'w_' + i, name: '项目_' + i });
      }


      this.datamodel = {
        title: 'scrollLayer',
        tips: '',
        data: [
          data1,
          data2
        ],
        btns: [
          { name: 'cancel', className: 'cui-btns-cancel' },
          { name: 'ok', className: 'cui-btns-ok' }
        ]
      };

      //这里便只有一个接口了
      this.displayNum = 3;

      this.scroll = [];

    },

    initElement: function () {

      //几个容器的高度必须统一
      this.swrappers = this.$('.cui-roller-bd');
      this.scrollers = this.$('.ul-list');



    },

    initSize: function () {
      var h = 0;
      this.itemHeight = this.$('.ul-list li').eq(0).height();
      h = this.itemHeight * this.displayNum;
      this.swrappers.height(h);


      var s = '';
    },

    _initScroll: function () {
      var i, len = this.swrappers.length;
      for (i = 0; i < len; i++) {
        this.scroll[i] = new UIScroll({
          wrapper: this.swrappers.eq(i),
          scroller: this.scrollers.eq(i)
        });
      }


    },

    initialize: function ($super, opts) {
      $super(opts);


      //这个要在第一位，因为后面会执行父类的position方法居中，尺寸没有就不行
      this.on('onShow', function () {
        this.initSize();
        this._initScroll();
      }, 1);

    },

    addEvent: function ($super) {
      $super();


    }

  });


});
