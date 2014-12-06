define(['View', getViewTemplatePath('scroll.layer'), 'UIScrollLayer', 'UIImageSlider'], function (View, viewhtml, UIScrollLayer, UIImageSlider) {
  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },
    events: {
      'click .demo0': 'demo0',
      'click .demo1': 'demo1',
      'click .demo2': 'demo2',
      'click .demo3': 'demo3',
      'click .demo4': 'demo4'
    },
    demo0: function () {
      if (!this.scrollLayer0) {
        var html = '<div class="isd-mapbox"><h3>&nbsp;大宁店<i class="x-ico"></i></h3><div id="mapcontainer" class="amap-container amap-fade-anim" style="width: 100%; height: 175px;"><div class="amap-maps" style="transform: translate3d(0px, 0px, 0px);"><div class="amap-layers"><div class="amap-layer" style="z-index: 1;"><div class="amap-tile-container amap-zoom-animated"></div><div class="amap-tile-container amap-zoom-animated"><div class="amap-copyright" style="display: none;">地图数据 ©2014 AutoNavi - GS(2014)6002号</div></div><div class="content"><p>营业时间：<span>08:00&nbsp;-&nbsp;20:00</span></p><p>联系电话：<span>021-66306100</span></p><p><span style="float: left;">具体地址：</span><span style="-webkit-box-orient: vertical;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 3;">上海市闸北区灵石路695号</span></p></div><div class="btn-bar"><p>¥<span>79</span>/天</p><span class="obtn" id="bookBtn" data-index="0">立即预订</span></div><p></p></div>';

        this.scrollLayer0 = new UIScrollLayer({
          datamodel: {
            title: '',
            btns: []
          },
          events: {
            'click  .x-ico': 'selfClick'
          },
          selfClick: function () {
            this.hide();
          },
          html: html,
          width: $(window).width() * 0.8,
          okAction: function () {
            console.log('that\'s ok');
            this.hide();
          },
          cancelAction: function () {
            console.log('that\'s cancel');
            this.hide();
          }
        });
      }
      this.scrollLayer0.show();
    },

    demo1: function () {
      if (!this.scrollLayer) {
        var html = '';
        for (var i = 0; i < 40; i++) {
          html += '<p>this is scrollLayer' + i + '</p>';
        }
        this.scrollLayer = new UIScrollLayer({
          maxHeight: 400,
          html: '<div class="s-tpl">' + html + '</div>',
          okAction: function () {
            console.log('that\'s ok');
            this.hide();
          },
          cancelAction: function () {
            console.log('that\'s cancel');
            this.hide();
          }
        });
      }
      this.scrollLayer.show();
    },
    demo2: function () {
      if (!this.scrollLayer2) {
        var html = '';
        for (var i = 0; i < 40; i++) {
          html += '<p>项目' + i + '</p>';
        }
        this.scrollLayer2 = new UIScrollLayer({
          maxHeight: 400,
          html: '<div class="s-tpl">' + html + '</div>',
          datamodel: {
            title: '测试',
            btns: [
              { name: '取消', className: 'cui-btns-cancel' },
              { name: '确定', className: 'cui-btns-ok' }
            ]
          },
          events: {
            'click .cui-btns-ok': 'myOkAction',
            'click .cui-btns-cancel': 'myCancelAction',
            'click .cui-top-close': 'myCloseAction'
          },
          myOkAction: function () {
            console.log('my ok');
            this.hide();
          },
          myCancelAction: function () {
            console.log('my cancel');
            this.hide();
          },
          myCloseAction: function () {
            console.log('my close');
            this.hide();
          }
        });
      }
      this.scrollLayer2.show();
    },
    demo3: function () {
      var scope = this;
      if (!this.scroll3) {
        var html = '';

        for (var i = 0; i < 40; i++) {
          html += '<li data-index="' + i + '"><i class="id-checkbox"></i>项目名称' + i + '</li>';
        }
        html = '<ul class="line-list line-list--checkbox">' + html + '</ul>';
        this.scroll3 = new UIScrollLayer({
          maxHeight: 250,
          html: html,
          datamodel: {
            title: '模拟list',
            btns: [
      { name: '取消', className: 'cui-btns-cancel' },
      { name: '确定', className: 'cui-btns-ok' }
    ]
          },
          events: {
            'click .cui-btns-ok': 'myOkAction',
            'click .cui-btns-cancel': 'myCancelAction',
            'click .line-list li': 'itemClick'
          },
          myOkAction: function () {
            var doms = this.$('i.checked');
            var secHtml = '';

            $.each(doms, function (i, el) {
              el = $(el).parent();
              var i = el.attr('data-index');
              secHtml += i + ', ';
            });
            scope.showToast('所选索引： ' + secHtml);
            this.hide();
          },
          myCancelAction: function () {
            console.log('my cancel');
            this.hide();
          },
          itemClick: function (e) {
            var el = $(e.currentTarget);
            var i = el.attr('data-index');
            el = el.find('.id-checkbox');
            if (el.hasClass('checked')) el.removeClass('checked');
            else el.addClass('checked');

          }
        });
      }
      this.scroll3.show();
    },

    demo4: function () {
      var scope = this;
      if (!this.scroll4) {
        var html = '<div class="cui-bd" style="overflow: hidden; position: relative; width: 100%; max-height: 547px; min-height: 50px; background-color: rgb(250, 250, 250);"><div class="hotel-detail-layer" style="background-color: white;"><div class="js_pop_slide_container" style="width: 100%; height: 190px; margin: auto; overflow: hidden; position: relative;"><div class="xslide-box-container" style="width: 280px; height: 190px;"></div></div><ul class="layer-hd p10 js_part1_info"><li><i class="hotel-icon-area"></i><span>面积</span>26㎡</li> <li><i class="hotel-icon-people"></i><span>可住</span>2人</li> <li><i class="hotel-icon-bed2"></i>该房型不可加床</li> <li><i class="hotel-icon-floor"></i><span>楼层</span>3-8层</li> <li><i class="hotel-icon-beds-width"></i><span>床宽</span><p>大床 1.50米</p></li> <li><i class="hotel-icon-browser"></i><span>宽带</span><p>免费有线宽带</p></li>  <li><i class="hotel-icon-smoke"></i><span>无烟</span><p>该房可无烟处理</p></li>  </ul><ul class="layer-bd"> <li><span class="ico-txt"><em class="ico-2">可返</em></span><p>2014-09-23至2015-12-31期间入住，每间夜最多可以使用79元消费券。自入住日起3个月内申请返现，订单成交3个工作日后可获得等额返现至现金账户。</p></li>    </ul></div></div>';

        this.scroll4 = new UIScrollLayer({
          maxHeight: 300,
          html: html,
          scrollOpts: {
            scrollbars: false,
            bounce: false
          },
          datamodel: {
            title: '高级大床房',
            btns: '<div class="hotel-detail-layer"><ul class="layer-bd"><li><button class="hotel-g-btn js_btn_book ">预订</button><em class="g-price"><small>¥</small>830</em></li></ul></div>'
          },
          events: {
            'click .cui-btns-ok': 'myOkAction',
            'click .cui-btns-cancel': 'myCancelAction',
            'click .js_btn_book': 'booking'
          },
          myOkAction: function () {
            var doms = this.$('i.checked');
            var secHtml = '';

            $.each(doms, function (i, el) {
              el = $(el).parent();
              var i = el.attr('data-index');
              secHtml += i + ', ';
            });
            scope.showToast('所选索引： ' + secHtml);
            this.hide();
          },
          myCancelAction: function () {
            console.log('my cancel');
            this.hide();
          },
          booking: function (e) {
            scope.showToast('预定流程');
            this.hide();
          }
        });
      }
      this.scroll4.show();

      //在此装载slider组件
      var slider_wrapper = this.scroll4.$('.xslide-box-container');
      var data = [
    { id: 1, src: './res/img/1.jpg', href: './res/img/1.jpg' },
    { id: 2, src: './res/img/2.jpg', href: './res/img/2.jpg' },
    { id: 3, src: './res/img/3.jpg', href: './res/img/3.jpg' },
    { id: 4, src: './res/img/4.jpg', href: './res/img/4.jpg' }
];

      if (!this.imgSlider) {
        this.imgSlider = new UIImageSlider({
          datamodel: {
            data: data,
            itemFn: function (item) {
              return '<img src="' + item.src + '" class="xslide-image-loading">';
            }
          },

          displayNum: 1,
          wrapper: slider_wrapper,
          changed: function (item) {
          }
        });
      }
      this.imgSlider.show();


    },
    onPreShow: function () {
      this.turning();
    },
    onShow: function () {
    },
    onHide: function () {
      if (this.imgSlider) this.imgSlider.stop();
    }
  });
});