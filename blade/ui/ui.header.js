
define(['UIView', 'text!T_UIHeader', 'text!C_UIHeader'], function (UIView, template, style) {

  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();

      //是否设置view所处作用域
      this.viewScope;

      this.datamodel = {
        left: [],
        right: [],
        center: {}
      };

      //html模板
      this.template = template;
      this.addUIStyle(style);
      this.openShadowDom = false;

      //每次create时候清空容器
      this.needEmptyWrapper = true;

      this.events = {};
    },

    resetPropery: function ($super) {
      $super();
      if (this.root && this.root[0]) this.wrapper = this.root;
    },

    //单纯的做老代码桥接......
    set: function (data) {

      //默认参数处理
      this.setOption(data);

      this._originData = data;
      if (typeof data != 'object') return;

      //做一个容错处理
      if (!data.events) data.events = {};

      if (data.view) this.viewScope = data.view;

      var _data = {
        left: [],
        right: [],
        center: {}
      };

      //左边模块
      var _left = {};

      //处理左边模块，默认只有一个
      if (data.back !== false) {
        if (_.isObject(data.back)) {
          _data.left.push(data.back);
        } else if (_.isString(data.backtext)) {
          _left.tagname = 'back';
          _left.value = data.backtext;
          if (_.isFunction(data.events.returnHandler)) _left.callback = data.events.returnHandler;
          _data.left.push(_left);
        } else if (!_.find(data.left, function (item) { return item.tagname == 'back' })) {
          //如果没有显示定义back为false，则无论如何需要一个回退按钮，这里做老接口兼容
          _data.left.push({ tagname: 'back', callback: data.events.returnHandler });
        }
      }

      //处理右边按钮群

      //电话
      if (_.isObject(data.tel)) {
        _data.right.push({
          tagname: 'tel',
          number: data.tel.number,
          callback: data.events.telHandler
        });
      }

      if (data.home) {
        _data.right.push({
          tagname: 'home',
          callback: data.events.homeHandler
        });
      }

      if (_.isObject(data.btn)) {
        _data.right.push({
          tagname: 'commit',
          value: data.btn.title,
          classname: data.btn.classname,
          data: data.btn.data,
          callback: data.events.commitHandler
        });
      }

      if (_.isArray(data.moreMenus)) {
        _data.right.push({
          tagname: 'list',
          data: data.moreMenus
        });
      }

      //处理标题逻辑，由于title的唯一性，这里中间便只存一个对象
      var _title = {}
      if (_.isString(data.title)) {
        _title.tagname = 'title';
        _title.value = data.title;
      }

      if (_.isString(data.subtitle)) {
        _title.tagname = 'subtitle';
        _title.value = [data.title, data.subtitle];
      }

      if (_.isString(data.citybtn)) {
        _title.tagname = 'select';
        _title.value = data.citybtn;
        _title.callback = data.events.citybtnHandler;
      }

      if (_.isObject(data.title)) {
        _title = data.title;
      }

      _data.center = _title;

      if (data.left) _data.left = data.left.concat(_data.left);
      if (data.right) _data.right = data.right.concat(_data.right);

      //将list一定放到右边
      var menuObj = _.groupBy(_data.right, function (rightItem) { return (rightItem.tagname == 'list') ? 'a' : 'b' });
      _data.right = (menuObj['b'] || []).concat(menuObj['a'] || []);

      //如果外部设置了center直接替换
      if (_.isObject(data.center)) _data.center = data.center;

      //hybrid的请求结构正确了，下面需要解析H5需要的结构，主要区别在标题处
      this.handleSpecialParam(_data);

      this.datamodel = _data;

      //在此生成具体事件绑定逻辑
      this.setEventsParam();

      //兼容处理，保持最后一次的returnHandler存根
      if (this.datamodel.left[0] && _.isFunction(this.datamodel.left[0].callback))
        this.lastReturnHandler = this.datamodel.left[0].callback;

      this.refresh(true);

      this.show();
    },

    //侧边栏默认回调，这个情况一般是用户直接使用moreMenus接口
    listDefaultCallback: function (e) {
      var i, len;

      //取出相关的数据，这里有一点定制化
      var _data = _.find(this.datamodel.right, function (obj) {
        return obj.tagname == 'list';
      });

      if (!_data) return;

      if (!this.sidebar) {
        this.sidebar = new UIBubbleLayer({
          datamodel: {
            data: _data.data,
            wrapperClass: 'cm-pop--user-nav',
            itemFn: function (item) {
              var classname = item.iconname || item.tagname;
              return '<i class="icon-' + classname + '"></i>' + item.value;
            }
          },
          triangleRight: '16px',
          triggerEl: $(e.currentTarget),
          width: '128px',
          onCreate: function () {
            this.mask.$el.addClass('cm-overlay--transparent');
            this.mask.$el.removeClass('cui-mask');
          },
          onClick: function (data, index, el) {
            if (_.isFunction(data.callback))
              data.callback.call(this.viewScope, data, index, el);
            this.hide();
          }
        });
      }

      if (this.sidebar.status == 'show') {
        this.sidebar.hide();
      } else {
        this.sidebar.show();
      }

    },

    backDefaultCallback: function () {
      if (this.lastReturnHandler) {
        this.lastReturnHandler.call(this.viewScope);
        return;
      }
      console.log('默认back回调');
      Lizard.goBack();
    },

    setEventsParam: function () {
      var item, _callback = null, data = this.datamodel.left.concat(this.datamodel.right).concat(this.datamodel.center);

      for (var i = 0, len = data.length; i < len; i++) {
        item = data[i];

        //有默认的便赋值默认
        if (_.isFunction(this[item.tagname + 'DefaultCallback']))
          _callback = this[item.tagname + 'DefaultCallback'];

        //外部传入的优先级更高
        if (_.isFunction(item.callback))
          _callback = $.proxy(item.callback, this.viewScope);

        if (_callback) {
          this.events['click .js_' + item.tagname] = _callback;
        }
        _callback = null;
      }
    },

    handleSpecialParam: function (data) {
      var k, i, len, item;
      for (k in data) {
        if (_.isArray(data[k])) {
          for (i = 0, len = data[k].length; i < len; i++) {
            item = data[k][i];
            if (this['customtHandle_' + item.tagname]) {
              this['customtHandle_' + item.tagname](data[k][i], k);
            } //if
          } //for
        } //if
      } //for
    },

    _getDir: function (dir) {
      var kv = { left: 'fl', right: 'fr' };
      return kv[dir];
    },

    //定制化信息
    customtHandle_tel: function (item, dir) {
      dir = this._getDir(dir);
      item.itemFn = function () {
        return '<a href="tel:' + item.number + '" class="cm-header-icon __hreftel__ ' + dir + ' js_' + item.tagname + ' " ><i class="icon-' + item.tagname + '"></i></a>';
      };
    },

    addEvent: function () {

      this.on('onShow', function () {
        this.wrapper.height('44px');
        this.$el.removeClass('cm-header--no-right');
        if (this.datamodel.right.length === 0) {
          this.$el.addClass('cm-header--no-right');
        }
      });

    },

    //    createRoot: function (html) {
    //      var hDom = $('#headerview');
    //      hDom.html('').css({height:'44px', backgroundColor: '#099fde'});
    //      this.$el = $(html).hide().attr('id', this.id);
    //    },

    updateHeader: function (name, val) {
      if (_.isObject(name)) {
        this.set(_.extend(this._originData, name));
      } else {
        if (_.isObject(this._originData)) {
          this.set(_.extend(this._originData, _.object([name], [val])));
        } else {
          this.set(_.object([name], [val]));
        }
      }
    }
  });
});
