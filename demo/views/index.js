define(['View', getViewTemplatePath('index'), 'UIGroupList'], function (View, viewhtml, UIGroupList) {

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
      'focus .cui-input-box': 'seachTxtFocus',
      'click .sss': function () {
      },
      'click .cui-btn-cancle': function () {
        this.closeSearch();
      },
      'click .seach-list>li': function (e) {
        var gindex = $(e.currentTarget).attr('data-group');
        var index = $(e.currentTarget).attr('data-index');

        this.forward(this.uidata[gindex].data[index].uiname);
      }
    },

    seachTxtFocus: function (e) {
      this.openSeach();

    },

    closeSearch: function () {
      this.txtWrapper.removeClass('cui-input-focus');
      this.groupList.show();
      this.searchList.hide();
      this.searchBox.val('');

    },

    //开启搜索状态
    openSeach: function () {
      if (this.TXTTIMERRES) return;

      this.TXTTIMERRES = setInterval($.proxy(function () {
        //        console.log(1);
        //如果当前获取焦点的不是input元素的话便清除定时器
        if (!this.isInputFocus()) {
          if (this.TXTTIMERRES) {
            clearInterval(this.TXTTIMERRES);
            this.TXTTIMERRES = null;
          }
        }

        var txt = this.searchBox.val().toLowerCase();
        if (txt == '') {
          setTimeout($.proxy(function () {
            if (!this.isInputFocus()) {
              this.closeSearch();
            }
          }, this), 500);
          return;
        }

        this.txtWrapper.addClass('cui-input-focus');
        this.groupList.hide();
        this.searchList.show();

        var list = this.groupList.getFilterList(txt);
        this.searchList.html(list);


      }, this));


    },

    isInputFocus: function () {
      if (document.activeElement.nodeName == 'INPUT' && document.activeElement.type == 'text')
        return true;
      return false;
    },

    initGoupList: function () {
      if (this.groupList) return;
      var scope = this;

      //提示类
      var groupList1 = [
        { 'uiname': 'pageview', 'name': '全局遮盖工具组件pageview' },
        { 'uiname': 'alert', 'name': '警告框' },
        { 'uiname': 'toast', 'name': 'toast框' },
        { 'uiname': 'reloading', 'name': 'loading框' },
        { 'uiname': 'bubble.layer', 'name': '气泡框提示' },
        { 'uiname': 'warning404', 'name': '404提醒' }
      ];

      var groupList2 = [
        { 'uiname': 'imageslider', 'name': '图片轮播' },
        { 'uiname': 'num', 'name': '数字组件' },
        { 'uiname': 'select', 'name': 'select组件' },
        { 'uiname': 'switch', 'name': 'switch组件' },
        { 'uiname': 'tab', 'name': 'tab组件' },
        { 'uiname': 'calendar', 'name': '日历组件' },
        { 'uiname': 'group.list', 'name': '分组列表' },
        { 'uiname': 'group.list', 'name': '搜索列表（城市搜索，地址搜索，待补充）' }
      ];

      var groupList3 = [
        { 'uiname': 'radio.list', 'name': '单列表选择组件' },
        { 'uiname': 'scroll.layer', 'name': '滚动层组件（可定制化弹出层，比较常用）' },
        { 'uiname': 'group.select', 'name': '日期选择类组件' },
        { 'uiname': 'scroll', 'name': '滚动组件/横向滚动' },
      ];

      var groupList4 = [
        { 'uiname': 'lazyload', 'name': '图片延迟加载' },
        { 'uiname': 'inputclear', 'name': '带删除按钮的文本框(todo...)' },
        { 'uiname': 'validate1', 'name': '工具类表单验证' },
        { 'uiname': 'validate2', 'name': '集成表单验证(todo...)' },
        { 'uiname': 'filp', 'name': '简单flip手势工具' }
      ];

      var uidata = [
        { name: '提示类组件', data: groupList1 },
        { name: '常用组件', data: groupList2 },
        { name: '滚动类组件', data: groupList3 },
        { name: '全局类', data: groupList4 }
      ];

      this.uidata = uidata;

      this.groupList = new UIGroupList({
        datamodel: {
          data: uidata,
          filter: 'uiname,name'
        },
        wrapper: this.$('.cui-citys-bd'),
        onItemClick: function (item, groupIndex, index, e) {
          scope.forward(item.uiname);
        }
      });


      this.groupList.show();

    },

    onPreShow: function () {
      this.initGoupList();
      this.turning();
    },

    onShow: function () {


  

    },

    onHide: function () {

    }

  });
});
