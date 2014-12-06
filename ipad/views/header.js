define(['View', getViewTemplatePath('header'), 'UIHeader', 'UIBubbleLayer'], function (View, viewhtml, UIHeader, UIBubbleLayer) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
    },
    _initHead: function () {
    },

    onPreShow: function () {
      this.turning();
      var scope = this;

      this.header = new UIHeader();

      this.header.set({
        back: true,
        right: [
          { 'tagname': 'home' },
          { 'tagname': 'search' },
          { 'tagname': 'list' },
          { 'tagname': 'tel', 'number': '56973144' },
          { 'tagname': 'commit', 'title': '登录' },
          { 'tagname': 'custom', 'title': '定制化',
            itemFn: function () {
              return '<span class="cm-header-btn fr js_custom">定制化</span>';
            }
          }
        ],
        //默认title为字符串，最简单情况
        title: '我是标题',
        title: ['大标题', '小标题'],
        title: { 'type': 'select', 'title': '下拉菜单' },
        title: { 'type': 'tabs', 'data': [{ id: '1', name: '类别1' }, { id: '2', name: '类别2'}], index: 0 },

        eventHandlers: {
          back: function () {
            console.log('返回');
          },
          custom: function () {
            console.log('定制化');
          },
          commit: function () {
            console.log('登录');
          },
          title: function (e) {

            console.log('标题点击回调');

          },
          list: function (e) {
            if (!scope.list) {
              var data = [{ name: '<span class="center">北京出发</span>' },
                { name: '<span class="center">杭州出发</span>' },
                { name: '<span class="center">成都出发</span>' },
                { name: '<span class="center">广州出发</span>'}];
              scope.list = new UIBubbleLayer({
                datamodel: {
                  data: data
                },
                triggerEl: $(e.currentTarget),
                width: '130px',
                triangleLeft: '25px',
                onClick: function (data, index) {
                  this.hide();
                }
              });
            }
            scope.list.show();
          }
        }

      });
      this.header.show();


      this.header1 = new UIHeader();

      this.header1.set({
        view: this,
        title: '我是title',
        subtitle: '中间副标题',
        citybtn: '上海',

        back: true,
        backtext: '取消',
        tel: { number: 1111 },
        home: true,
        search: true,
        btn: { title: "登录", id: 'confirmBtn', classname: 'header_r' },
        moreMenus: [
          { name: '<i class="icon-share"></i>分享',
            callback: function (item) {
              console.log(item);
            }
          },
          { name: '<i class="icon-comment"></i>预约咨询',
            callback: function (item) {
              console.log(arguments);
            }
          },
          { name: '<i class="icon-phone"></i>联系我们',
            callback: function (item) {
              console.log(arguments);
            }
          },
          { name: '<i class="icon-compass"></i>团队助手',
            callback: function (item) {
              console.log(arguments);
            }
          },
          { name: '<i class="icon-compass"></i>团队助手1',
            callback: function (item) {
              console.log(item);
            }
          }
        ],

        //        right: [
        //          { 'tagname': 'home' },
        //          { 'tagname': 'search' },
        //          { 'tagname': 'list' },
        //          { 'tagname': 'tel', 'number': '56973144' },
        //          { 'tagname': 'commit', 'title': '登录' },
        //          { 'tagname': 'custom', 'title': '定制化',
        //            itemFn: function () {
        //              return '<span class="cm-header-btn fr js_custom">定制化</span>';
        //            }
        //          }
        //        ],

        events: {
          homeHandler: function () {
            console.log('homeHandler');
          },
          returnHandler: function () {
            console.log('returnHandler');
          },
          citybtnHandler: function () {
            console.log('citybtnHandler');
          },
          commitHandler: function () {
            console.log('commitHandler');
          }
        }

      });
      this.header1.show();
      this.header1.$el.css('top', '100px');
      s = '';
    },

    onShow: function () {
    },

    onHide: function () {
    }

  });
});
