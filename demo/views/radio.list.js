define(['View', getViewTemplatePath('radio.list'), 'UIRadioList'], function (View, viewhtml, UIRadioList) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);

    },

    events: {
      'click .demo1': 'demo1',
      'click .demo-input1': 'demo_input1',
      'click .demo-input2': 'demo_input2',
      'click .demo-input3': 'demo_input3',
      'click .demo2': 'demo2',
      'click .demo3': 'demo3',
      'click .demo4': 'demo4'
    },

    demo_input1: function () {
      this.demo1();
    },
    demo_input2: function () {
      this.demo2();
    },
    demo_input3: function () {
      this.demo3();
    },

    demo1: function () {
      if (!this.radio1) {
        var demodata1 = [{ id: '华语' }, { id: '欧美' }, { id: '工作学习' }, { id: '粤语' }, { id: '轻音乐' }, { id: '咖啡'}],
            scope = this;
        this.radio1 = new UIRadioList({
          //数据模型
          datamodel: {
            title: '豆瓣fm',
            data: demodata1
          },
          displayNum: 5,
          selectId: 4,
          index: 4,
          onClick: function (e, data) {
            console.log(data.id);
            scope.$('.demo-input1').val(data.id);
            this.hide();
          }
        });
      }
      this.radio1.show();
    },

    demo2: function () {
      if (!this.radio2) {
        var demodata2 = [{ id: '红茶' }, { id: '绿茶' }, { id: '菊花茶' }, { id: '茉莉茶' }, { id: '铁观音' }, { id: '乌龙茶' }, { id: '奶茶' }, { id: '打奶茶'}],
            scope = this;
        this.radio2 = new UIRadioList({
          datamodel: {
            title: '茶',
            data: demodata2
          },
          //绑定事件
          events: {
            'click .cui-select-view> li': 'myClickAction'
          },
          myClickAction: function (e) {
            var el = $(e.target),  //获取当前点击的dom
                i = el.attr('data-index');
            this.setIndex(i);  //设置点击的选项
            scope.$('.demo-input2').val(this.getSelected().id);  //input里显示值
            console.log('my click action ', this.getSelected());
            this.hide();
          }
        });
      }
      this.radio2.show();
    },

    demo3: function () {
      //清空、销毁radio3
      if (this.radio3) {
        this.radio3.$el.next('.cui-mask').detach();
        this.radio3.$el.detach();
        this.radio3 = null;
      }

      if (!this.radio3) {
        var beforeData3 = [{ id: '红茶' }, { id: '绿茶' }, { id: '菊花茶' }, { id: '茉莉茶' }, { id: '铁观音' }, { id: '乌龙茶' }, { id: '奶茶' }, { id: '打奶茶'}],
            setData3 = [{ id: '冰红茶' }, { id: '冰绿茶' }, { id: '玫瑰花茶' }, { id: '薄荷茶'}],
            scope = this; ;
        //动态改变的数据
        var setDatamodel = {
          title: 'set茶',
          data: setData3
        };
        this.radio3 = new UIRadioList({
          datamodel: {
            title: '1秒改变茶',
            data: beforeData3
          },
          onClick: function (e, data) {
            scope.$('.demo-input3').val(data.id);  //input里显示值
            this.hide();
          }
        });
      }
      this.radio3.show();
      //1秒后动态改变组件的数据
      setTimeout(function () {
        this.radio3.setDatamodel(setDatamodel);
      } .bind(this), 1000);

    },

    demo4: function () {
//      var scope = this;
//      if (!this.radio4) {
//        var demodata2 = [{ id: '红茶' }, { id: '绿茶' }, { id: '菊花茶' }, { id: '茉莉茶' }, { id: '铁观音' }, { id: '乌龙茶' }, { id: '奶茶' }, { id: '打奶茶'}],
//            scope = this;
//        this.radio4 = new UIRadioList({
//          datamodel: {
//            title: '茶',
//            data: demodata2
//          },
//          //绑定事件
//          events: {
//            'click .cui-select-view> li': 'myClickAction'
//          },
//          myClickAction: function (e) {
//            var el = $(e.target),  //获取当前点击的dom
//                i = el.attr('data-index');
//            this.setIndex(i);  //设置点击的选项
//            scope.$('.demo-input4').val(this.getSelected().id);  //input里显示值
//            console.log('my click action ', this.getSelected());
//          }
//        });
//      }
//      this.radio4.show();

    },

    onPreShow: function () {
      this.turning();
    },

    onShow: function () {

    },

    onHide: function () {

    }

  });
});
