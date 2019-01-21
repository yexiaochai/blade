import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
// import Header from '../../ui/header/header';

import './index.css'

// class HeaderMain extends Component {
//   // constructor(props) {
//   //     super(props);

//   //     this.state = {
//   //         title: '我是标题'
//   //     };

//   //     //这里定义，右边按钮规则
//   //     this.state.right = [
//   //         {
//   //             //希望代码执行时候的作用域
//   //             view: this,
//   //             tagname: 'search',
//   //             callback: function () {
//   //                 console.log(this)
//   //                 console.log('搜索')
//   //             }
//   //         },
//   //         {
//   //             view: this,
//   //             tagname: 'tips',
//   //             value: '说明',
//   //             callback: function () {
//   //                 alert('我是按钮')
//   //             }
//   //         }
//   //     ]

//   // }
//   // onBackaction() {
//   //     console.log('返回')
//   // }
//   render() {
//     return (
//       <View>
//         123
//       </View>
//     )
// }
//   // render() {
//   //     return (
//   //       <View>
//   //         123
//   //         <Header right={this.state.right} title={this.state.title} backaction={this.onBackaction.bind(this)} />
//   //       </View>
//   //     )
//   // }
// }

class Welcome extends Component {
  render() {
    return <View>Hello, {this.props.name}</View>
  }
}
export default class Index extends Component {
  config: Config = {
    navigationBarTitleText: '首页'
  }
  render() {
    console.log('dss')
    return (
      <View className='index'>
        <View>1111</View>
        <Welcome name="Wallace" />
        <Text>Hello world1!</Text>
        <View>2222</View>
      </View>
    )
  }
}



define(['View', getViewTemplatePath('alert'), 'UIAlert', 'UIGroupSelect'], function (View, viewhtml, UIAlert, UIGroupSelect) {

  return _.inherit(View, {
    propertys: function ($super) {
      $super();
      this.template = viewhtml;

      this.addEvents({
        'click .js_demo001': 'demo01',
        'click .js_demo02': 'demo02'
      });
    },

    showSelect: function () {
      var i, h = [], m = [], s = [];
      for(i = 1; i < 13; i++) {
        h.push({
          id: i,
          name: i
        })
      }

      for(i = 1; i < 61; i++) {
        m.push({
          id: i,
          name: i
        });
        s.push({
          id: i,
          name: i
        });
      }

      if (!this.select) {
        this.select = new UIGroupSelect({
          tips: '请选择时分秒',
          title: '选择矿石剩余时间',
          idArr: [],
          data: [h, m, s]
        });
      }
      this.select.show();

    },

    addEvent: function ($super) {
      $super();
      this.on('onShow', function () {
        this.showSelect();
      });
    },

    demo01: function () {
      var txt = this.$('.js_txt001').val();
      var n = new Date();
      var t = txt;
      var arrTime = t.split('-');
      var howLong = parseInt(arrTime[0]) * 3600 + parseInt(arrTime[1]) * 60 + parseInt(arrTime[2]);
      var theTime = new Date(n.getTime() + parseInt(howLong) * 1000);

      if (!this.alert01) {
        this.alert01 = new UIAlert({
          title: '下次矿石时间',
          content: theTime.toLocaleTimeString()

        });
      }

      this.alert01.show();

    },
    demo02: function () {
      if (!this.alert02) {
        this.alert02 = new UIAlert({
          title: '购票须知',
          content: '凭身份证可以通过',
          btns: [
            { name: '知道了', className: 'cui-btns-ok' },
            { name: '不知道', className: 'cui-btns-no' },
            { name: '未知', className: 'cui-btns-unknown' }
          ],

          events: {
            'click .cui-btns-ok': 'okAction',
            'click .cui-btns-no': 'noAction',
            'click .cui-btns-unknown': 'unknownAction'
          },
          okAction: function () {
            alert('这里可以执行ok callback');
            this.hide();
          },
          noAction: function () {
            alert('这里可以执行no ok callback');
            this.hide();
          },
          unknownAction: function () {
            alert('这里可以执行unknow callback');
            this.hide();
          }
        });
      }

      this.alert02.show();
    }

  });

});
