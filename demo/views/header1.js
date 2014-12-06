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


      this.header1 = new UIHeader({
        datamodel: {
          left: [
              {
                tagname: 'back',
                //icon或者btn
                type: 'btn',
                title: '取消'
              }
            ],
          center: [
              {
                tagname: 'title',
                type: 'title',
                title: '我是标题2'
              }
            ],
          right: [

              {
                tagname: 'commit',
                type: 'btn',
                title: '确认'
              }
            ]
        },
        eventHandlers: {
          //与tagname一一对应
          'back': function () {
            console.log('back');
          },
          'home': function () {
            console.log('home');
          },
          'commit': function () {
            console.log('commit');
          },
          'title': function () {
            console.log('title');
          }
        }
      });

      this.header1.show();
      this.header1.$el.css('top', '50px');


      this.header2 = new UIHeader({
        datamodel: {
          left: [
              {
                tagname: 'back',
                type: 'icond'
              }
            ],
          center: [
              {
                tagname: 'title',
                type: 'select',
                title: '上海出发'
              }
            ],
          right: [
              {
                tagname: 'home',
                type: 'icon'
              },
              {
                tagname: 'tel',
                type: 'icon'
              }
            ]
        },
        eventHandlers: {
          //与tagname一一对应
          'back': function () {
            console.log('back');
          },
          'home': function () {
            console.log('home');
          },
          'tel': function () {
            console.log('tel');
          },
          'title': function (e) {
            var el = $(e.currentTarget);

            if (!scope.demo2) {
              var data = [{ name: '<span class="center">北京出发</span>' },
                { name: '<span class="center">杭州出发</span>' },
                { name: '<span class="center">成都出发</span>' },
                { name: '<span class="center">广州出发</span>'}];
              scope.demo2 = new UIBubbleLayer({
                datamodel: {
                  data: data
                },
                triggerEl: $(e.currentTarget),
                onHide: function () {
                  el.removeClass('expanded');
                },
                onClick: function (data, index) {
                  el.html(data.name);
                  this.hide();
                }
              });
            }

            if (el.hasClass('expanded')) {
              el.removeClass('expanded');
              scope.demo2.hide();
            } else {
              el.addClass('expanded');
              scope.demo2.show();
            }

          }
        }
      });

      this.header2.show();
      this.header2.$el.css('top', '100px');


      this.header3 = new UIHeader({
        datamodel: {
          left: [
              {
                tagname: 'back',
                type: 'icond'
              }
            ],
          center: [
              {
                tagname: 'title',
                type: 'title',
                title: ['大号标题', '小号标题']
              }
            ],
          right: [
              {
                tagname: 'home',
                type: 'icon'
              },
              {
                tagname: 'search',
                type: 'icond'
              }
            ]
        },
        eventHandlers: {
          //与tagname一一对应
          'back': function () {
            console.log('back');
          },
          'home': function () {
            console.log('home');
          },
          'search': function () {
            console.log('search');
          }
        }
      });

      this.header3.show();
      this.header3.$el.css('top', '150px');



      this.header4 = new UIHeader({
        datamodel: {
          left: [
              {
                tagname: 'back',
                type: 'icond'
              }
            ],
          center: [
              {
                tagname: 'title',
                type: 'tabs',
                data: [{ id: '1', name: '类别1' }, { id: '2', name: '类别2'}],
                index: 1
              }
            ],
          right: [
            {
              itemFn: function () {
                return '<span class="fr cm-header-btn">文字信息</span>';
              }
            }
          ]
        },
        eventHandlers: {
          //与tagname一一对应
          'back': function () {
            console.log('back');
          },
          'home': function () {
            console.log('home');
          },
          'tel': function () {
            console.log('tel');
          },
          'title': function (e) {
            var el = $(e.target);
            var wrapper = $(e.currentTarget);

            wrapper.find('span').removeClass('active');
            el.addClass('active');

            console.log(el.attr('data-key'));


          }
        }
      });

      this.header4.show();
      this.header4.$el.css('top', '200px');

    },

    onShow: function () {
    },

    onHide: function () {
    }

  });
});
