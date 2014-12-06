
define(['UIView', getAppUITemplatePath('ui.header'), 'UIBubbleLayer'], function (UIView, template, UIBubbleLayer) {

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
      this.events = {};
    },

    resetPropery: function ($super) {
      $super();
      if (this.root && this.root[0]) this.wrapper = this.root;
    },

    //单纯的做老代码桥接......
    set: function (data) {
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
      if (_.isObject(data.back)) {
        _data.left.push(data.back);
      } else if (_.isBoolean(data.back)) {
        _left.tagname = 'back';
        if (_.isString(data.backtext)) _left.value = data.backtext;
        _left.callback = data.events.returnHandler;
        _data.left.push(_left);
        if (Lizard.isHybrid || Lizard.isInCtripApp) {
          var backScope = this.viewScope
          require(['cHybridShell'], function (cHybridShell) {
            cHybridShell.off('back').on('back', function () {
              if (Lizard){
                if (Lizard.instance._alert.status == 'show') {
                  Lizard.hideMessage();
                  return false;
                }
                if (Lizard.instance._confirm.status == 'show') {
                  Lizard.hideConfirm();
                  return false;
                }
                if (Lizard.instance._toast.status == 'show') {
                  Lizard.hideToast();
                  return false;
                }
              }
              data.events.returnHandler.call(backScope);
              return false;
            });
          });
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
      var menuObj = _.groupBy(_data.right, function (rightItem) { return (rightItem.tagName == 'list') ? 'a' : 'b' });
      _data.right = (menuObj['a'] || []).concat(menuObj['b'] || []);
      //      _.extend(_data.left, data.left);
      //      _.extend(_data.right, data.right);

      //如果外部设置了center直接替换
      if (_.isObject(data.center)) _data.center = data.center;

      //hybrid的请求结构正确了，下面需要解析H5需要的结构，主要区别在标题处
      this.handleSpecialParam(_data);

      this.datamodel = _data;

      //在此生成具体事件绑定逻辑
      this.setEventsParam();

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
      console.log('默认back回调');
      Lizard.goBack();
    },
    /**
     * 添加hybrid下，电话直落的功能
     * @param e
     */
    telDefaultCallback:function(e){
      //取出相关的数据，添加电话直落功能
      var _data = _.find(this.datamodel.right, function (obj) {
        return obj.tagname == 'tel';
      });
      if (_data && (Lizard.isHybrid || Lizard.isInCtripApp)) {
        //首先阻止H5下 a标签触发打电话的功能
        e.preventDefault();
        require(['cHybridShell'], function (cHybridShell) {          
          var fn = new cHybridShell.Fn('call_phone');
          if (Lizard && Lizard.instance.curView && Lizard.instance.curView.businessCode){
            fn.run(_data.number, Lizard.instance.curView.pageid, Lizard.instance.curView.businessCode);
          } else {
            fn.run(_data.number);
          } 
        });
      }
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

    //处理back的按钮逻辑
    customtHandle_back: function (item, dir) {
      dir = this._getDir(dir);
      item.itemFn = function () {
        var str = '';
        if (item.value) {
          var str = '<a href="http://m.ctrip.com/html5/" class="cm-header-btn ' + dir + ' js_' + item.tagname + ' " >';
          str += item.value + '</a>';
        } else {
          var str = '<a href="http://m.ctrip.com/html5/" class="cm-header-icon ' + dir + ' js_' + item.tagname + ' " >';
          str += '<i class="icon-' + item.tagname + '"></i></a>';
        }
        return str;
      };
    },

    //定制化信息
    customtHandle_tel: function (item, dir) {
      dir = this._getDir(dir);
      item.itemFn = function () {
        return '<a href="tel:' + item.number + '" class="cm-header-icon __hreftel__ ' + dir + ' js_' + item.tagname + ' " ><i class="icon-' + item.tagname + '"></i></a>';
      };
    },

    initialize: function ($super, opts) {
      $super(opts);
      this.set({
        back: true, 
        events: { 
          returnHandler: function () {
            Lizard.goBack();
          }
        }
      });
    },

    createRoot: function (html) {
      var hDom = $('#headerview');
      hDom.html('');
      this.$el = $(html).hide().attr('id', this.id);
    },

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
