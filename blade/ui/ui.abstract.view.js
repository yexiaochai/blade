/**
* UI组件基类，提供一个UI类基本功能，并可注册各个事件点：
① onPreCreate 在dom创建时触发，只触发一次
② onCreate 在dom创建后触发，只触发一次

缺陷：
① 各个属性或者方法名称比较常用，担心被覆盖
② ui的dom结构可能一开始便已经存在的，这样的话便不能与template与viewModel产生联系，这样需要处理，如果存在默认的dom结构的话，需要规定其dom结构满足一定规则
<div class="ui">
  <style class="js_shadow_style"></style>
  <div class="js_shadow_root"></div>
</div>
这里如何剥离需要做验证

③ 开启shadow dom的情况下，容器组件会失效，因为阻断了与外部css的联系，这里要求传入css，不太智能

* @namespace UIView
*/
define(['text!C_UIView'], function (style) {
  'use strict';

  /**
  * @description 闭包保存所有UI共用的信息，这里是z-index
  * @method getBiggerzIndex
  * @param {Number} level
  * @returns {Number}
  */
  var getBiggerzIndex = (function () {
    var index = 3000;
    return function (level) {
      return level + (++index);
    };
  })();

  return _.inherit({

    /**
    * @description 设置实例默认属性
    * @method propertys
    */
    propertys: function () {
      //这里设置UI的根节点所处包裹层
      this.wrapper = $('body');
      this.id = _.uniqueId('ui-view-');

      //与模板对应的css文件，默认不存在，需要各个组件复写
      this.uiStyle = null;
      if (style) this.uiStyle = [style];
      //在不不支持shadow dom的情况下，需要降级处理，这里保存样式格式化结束的字符串，避免重复格式化
      this.formateStyle = '';

      //支持shadow dom情况下，需要提前在内存中保存shadow dom的关键节点，否则便不能找到了
      //style节点
      this.shadowStyle = null;
      //dom根节点
      this.shadowRoot = null;

      //框架统一开关，是否开启shadow dom
      this.openShadowDom = true;

      //每次装载UI进wrapper时候是否需要清空容器，这个属性慎用，如果容器为body的话，就全部木有了
      this.needEmptyWrapper = false;

      //模板字符串，各个组件不同，现在加入预编译机制
      this.template = '';
      //事件机制
      this.events = {};

      //自定义事件
      //此处需要注意mask 绑定事件前后问题，考虑scroll.radio插件类型的mask应用，考虑组件通信
      this.eventArr = {};

      //初始状态为实例化
      this.status = 'init';

      //保存ui的类型，并且会存在关系链
      this.uiType = ['abstractView'];

      //要开启动画，需要配置以下3个属性
      this.needAnimat = false;
      this.animateShowAction = null;
      this.animateHideAction = null;

    },

    /**
    * @description 设置当前view的类型
    * @method propertys
    * @return Object
    */
    setUIType: function (type) {
      if (_.isString(type)) this.uiType.push(type);
    },

    /**
    * @description 这里必须返回一个对象，用于与模板做数据渲染，这个方法一般需要override
    * @method propertys
    * @return Object
    */
    getViewModel: function () {
      //假如有datamodel的话，便直接返回，不然便重写，这里基本为了兼容
      if (_.isObject(this.datamodel)) return this.datamodel;
      return {};
    },

    /**
    * @description 返回一个默认的
    * @method _getDefaultViewModel
    * @return Object
    */
    _getDefaultViewModel: function (arr) {
      var k, i, len, obj = {};
      for (i = 0, len = arr.length; i < len; i++) {
        k = arr[i];
        obj[k] = this[k];
      }
      return obj;
    },

    //子类事件绑定若想保留父级的，应该使用该方法
    addEvents: function (events) {
      if (_.isObject(events)) _.extend(this.events, events);
    },

    //希望继承父类的情况下组装内嵌style
    addUIStyle: function (style) {
      this.uiStyle.push(style);
    },

    //阻止默认冒泡事件
    _preventDefault: function (e) {
      e.preventDefault();
    },

    /**
    * @description 绑定事件点回调，这里应该提供一个方法，表明是insert 或者 push，这样有一定手段可以控制各个同一事件集合的执行顺序
    * @param {String} type
    * @param {Function} fn
    * @param {Boolean} insert
    * @method on
    */
    on: function (type, fn, insert) {
      if (!this.eventArr[type]) this.eventArr[type] = [];

      //头部插入
      if (insert) {
        this.eventArr[type].splice(0, 0, fn);
      } else {
        this.eventArr[type].push(fn);
      }
    },

    /**
    * @description 移除某一事件回调点集合中的一项
    * @param {String} type
    * @param {Function} fn
    * @method off
    */
    off: function (type, fn) {
      if (!this.eventArr[type]) return;
      if (fn) {
        this.eventArr[type] = _.without(this.eventArr[type], fn);
      } else {
        this.eventArr[type] = [];
      }
    },

    /**
    * @description 触发某一事件点集合回调，按顺序触发
    * @method trigger
    * @param {String} type
    * @returns {Array}
    */
    //PS：这里做的好点还可以参考js事件机制，冒泡捕获处于阶段
    trigger: function (type) {
      var _slice = Array.prototype.slice;
      var args = _slice.call(arguments, 1);
      var events = this.eventArr;
      var results = [], i, l;

      if (events[type]) {
        for (i = 0, l = events[type].length; i < l; i++) {
          results[results.length] = events[type][i].apply(this, args);
        }
      }
      return results;
    },

    /**
    * @description 创建dom根元素，并组装形成UI Dom树
    * @override 这里可以重写该接口，比如有些场景不希望自己创建div为包裹层
    * @method createRoot
    * @param {String} html
    */
    createRoot: function (html) {

      //UI的根节点
      this.$root = $('<div class="view" style="display: none; " id="' + this.id + '"></div>');
      this.formateStyle = this.getInlineStyle();
      //节点保存下来
      this.shadowStyle = $(this.formateStyle);

      //生成实际的dom结构，并且将之封装
      this.$el = $('<div class="js_shadow_root">' + html + '</div>');

      //如果开启shadow dom的话
      if (this.openShadowDom) {
        /*生成shadow dom的根节点，这里是以UI的根节点创建的shadow dom，创建后将之内存映射关系做保存，否则后期没有办法获取这个映射关系
        */
        this.shadowRoot = $(this.$root[0].createShadowRoot());

        //装载style与实际dom结构
        this.shadowRoot.append(this.shadowStyle);
        this.shadowRoot.append(this.$el);

      } else {
        //如果不支持的话，便直接装载到UI根节点，这个时候除了多了一层shadowdom，整个dom结构是一致的
        this.$root.append(this.shadowStyle);
        this.$root.append(this.$el);
      }

    },

    /**
    * @description 根据传入的uiStyle字符串生成格式化后的css，如果开启shadow dom便不格式化
    * @override 
    * @method getInlineStyle
    * @param {Object} options
    * @return string
    */
    getInlineStyle: function () {
      //如果不存在便不予理睬
      if (!this.uiStyle || !_.isArray(this.uiStyle)) return '';
      var style = this.uiStyle.join(''), uid = this.id;

      //在此处理shadow dom的样式，直接返回处理结束后的html字符串
      if (!this.openShadowDom) {
        //创建定制化的style字符串，会模拟一个沙箱，该组件样式不会对外影响，实现原理便是加上#id 前缀
        style = style.replace(/(\s*)([^\{\}]+)\{/g, function (a, b, c) {
          return b + c.replace(/([^,]+)/g, '#' + uid + ' $1') + '{';
        });
      }

      return '<style class="js_shadow_style">' + style + '</style>';
    },

    _isAddEvent: function (key) {
      if (key == 'onCreate' || key == 'onPreShow' || key == 'onShow' || key == 'onRefresh' || key == 'onHide')
        return true;
      return false;
    },

    /**
    * @description 设置参数，重写默认属性
    * @override 
    * @method setOption
    * @param {Object} options
    */
    setOption: function (options) {
      //这里可以写成switch，开始没有想到有这么多分支
      for (var k in options) {
        if ( k == 'events') {
          _.extend(this[k], options[k]);
          continue;
        } else if (this._isAddEvent(k)) {
          this.on(k, options[k])
          continue;
        }
        this[k] = options[k];
      }
      //      _.extend(this, options);
    },

    /**
    * @description 构造函数
    * @method initialize
    * @param {Object} opts
    */
    initialize: function (opts) {
      //这种默认属性
      this.propertys();
      //根据参数重置属性
      this.setOption(opts);
      //检测不合理属性，修正为正确数据
      this.resetPropery();

      //添加系统级别事件
      this.addEvent();
      //开始创建dom
      this.create();

      this.initElement();

    },

    //内部重置event，加入全局控制类事件
    addSysEvents: function () {
      if (typeof this.availableFn != 'function') return;
      this.removeSysEvents();
      this.$el.on('click.system' + this.id, $.proxy(function (e) {
        if (!this.availableFn()) {
          e.preventDefault();
          e.stopImmediatePropagation && e.stopImmediatePropagation();
        }
      }, this));
    },

    removeSysEvents: function () {
      this.$el.off('.system' + this.id);
    },

    $: function (selector) {
      return this.$el.find(selector);
    },

    //提供属性重置功能，对属性做检查
    resetPropery: function () {
      //如果不存在UIStyle的话，暂时不开启shadow dom
      if (!this.uiStyle) this.openShadowDom = false;

      //不支持创建接口便关闭，也许有其它因素导致，这个后期已接口放出
      if (!this.wrapper[0].createShadowRoot) {
        this.openShadowDom = false;
      }
    },

    //各事件注册点，用于被继承override
    addEvent: function () {
    },

    create: function () {
      this.trigger('onPreCreate');
      this.createRoot(this.render());

      this.status = 'create';
      this.trigger('onCreate');
    },

    //实例化需要用到到dom元素
    initElement: function () { },

    /**
    * @description 根据getViewModel接口返回渲染模板所需数据，并且根据模板返回组装好的字符串
    * @method render
    * @return 
    */
    render: function (callback) {
      var data = this.getViewModel() || {};
      var html = this.template;
      if (!this.template) return '';
      //引入预编译机制
      if (_.isFunction(this.template)) {
        html = this.template(data);
      } else {
        html = _.template(this.template)(data);
      }
      typeof callback == 'function' && callback.call(this);
      return html;
    },

    //刷新根据传入参数判断是否走onCreate事件
    //这里原来的dom会被移除，事件会全部丢失 需要修复*****************************
    refresh: function (needRecreate) {
      this.resetPropery();
      if (needRecreate) {
        this.create();
      } else {
        this.$el.html(this.render());
      }
      this.initElement();
      if (this.status != 'hide') this.show();
      this.trigger('onRefresh');
    },

    /**
    * @description 组件显示方法，首次显示会将ui对象实际由内存插入包裹层
    * @method initialize
    * @param {Object} opts
    */
    show: function () {
      if (!this.wrapper[0] || !this.$root[0]) return;
      //如果包含就不要乱搞了，这里可以这样判断，也可以以type方式判断，为防止用户手动情况dom，还是这么判断吧......
      if (!$.contains(this.wrapper[0], this.$root[0])) {
        //如果需要清空容器的话便清空
        if (this.needEmptyWrapper) this.wrapper.html('');
        this.wrapper.append(this.$root);
      }

      this.trigger('onPreShow');

      /*
      ******update******
      ******bug******
      这里会有一个bug，一个组件连续两次show的话，希望有一个状态机判断只执行一次动画，这里未处理
      这里只判断animateShowAction做动画了，具体的动画参数判断，往子类放
      */
      if (this.needAnimat && _.isFunction(this.animateShowAction) && this.status != 'show') {
        this.animateShowAction.call(this, this.$root);
      } else {
        this.$root.show();
      }

      this.status = 'show';

      this.addSysEvents();
      this.bindEvents();

      this.trigger('onShow');
    },

    hide: function () {
      if (!this.$root || this.status !== 'show') return;

      this.trigger('onPreHide');

      if (this.needAnimat && _.isFunction(this.animateHideAction) && this.status != 'hide') {
        this.animateHideAction.call(this, this.$root);
      } else {
        this.$root.hide();
      }

      this.status = 'hide';
      this.unBindEvents();
      this.removeSysEvents();
      this.trigger('onHide');
    },

    //检测某class是否包含动画特性，不太可靠的做法
    hasAnimationProperty: function (className) {
      var animateProprtys = [
      //有什么判断的便新增
        $.fx.cssPrefix + 'animation-name'
      ];
      var el = $('<div></div>');

      //赋予其class
      el.attr('class', className);
      $('body').append(el);

      if (el.css(animateProprtys[0]) != 'none') {
        el.remove();
        return true;
      }
      el.remove();
      return false;
    },

    destroy: function () {
      this.status = 'destroy';
      this.unBindEvents();
      this.removeSysEvents();
      this.$root.remove();
      this.trigger('onDestroy');
      delete this;
    },

    setzIndexTop: function (el, level) {
      if (!el) el = this.$root;
      if (!level || level > 10) level = 0;
      level = level * 1000;
      el.css('z-index', getBiggerzIndex(level));

    },

    /**
    * 解析events，根据events的设置在dom上设置事件
    */
    bindEvents: function () {
      var events = this.events;

      if (!(events || (events = _.result(this, 'events')))) return this;
      this.unBindEvents();

      // 解析event参数的正则
      var delegateEventSplitter = /^(\S+)\s*(.*)$/;
      var key, method, match, eventName, selector;

      // 做简单的字符串数据解析
      for (key in events) {
        method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) continue;

        match = key.match(delegateEventSplitter);
        eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateUIEvents' + this.id;

        if (selector === '') {
          this.$el.on(eventName, method);
        } else {
          this.$el.on(eventName, selector, method);
        }
      }

      return this;
    },

    /**
    * 冻结dom上所有元素的所有事件
    *
    * @return {object} 执行作用域
    */
    unBindEvents: function () {
      this.$el.off('.delegateUIEvents' + this.id);
      return this;
    }

  });

});
