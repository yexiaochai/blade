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
        { 'uiname': 'alert', 'name': '警告框' },
        { 'uiname': 'confirm', 'name': '确认框' },
        { 'uiname': 'toast', 'name': 'toast框' },
        { 'uiname': 'loading', 'name': 'loading框' }
      ];

      var uidata = [
        { name: '提示类组件', data: groupList1 }
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
