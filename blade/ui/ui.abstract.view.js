/**
* @File ui.abstract.view.js
* @Description: UI组件基类
* @author l_wang@ctrip.com
* @date 2014-10-09
* @version V1.0
*/

/**
* UI组件基类，提供一个UI类基本功能，并可注册各个事件点：
① onPreCreate 在dom创建时触发，只触发一次
② onCreate 在dom创建后触发，只触发一次

* @namespace UIView
*/
define([], function () {

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

  var UIContainerUtil = (function () {
    //一个闭包对象存放所有实例化的ui实例
    var UIContainer = {};

    return {
      addItem: function (id, ui) {
        UIContainer[id] = ui;
      },

      removeItem: function (id) {
        if (UIContainer[id]) delete UIContainer[id];
      },

      getItem: function (id) {
        if (id) return UIContainer[id];
        return UIContainer;
      }
    };
  })();


  return _.inherit({

    /**
    * @description 设置实例默认属性
    * @method propertys
    */
    propertys: function () {
      //模板状态
      this.wrapper = $('body');
      this.id = _.uniqueId('ui-view-');

      this.template = '';
      this.datamodel = {};
      this.events = {};

      //自定义事件
      //此处需要注意mask 绑定事件前后问题，考虑scroll.radio插件类型的mask应用，考虑组件通信
      this.eventArr = {};

      //初始状态为实例化
      this.status = 'init';

      //要开启动画，需要配置以下3个属性
      this.needAnimat = false;
      this.animateShowAction = null;
      this.animateHideAction = null;

      //是否需要div包裹根元素
      this.needRootWrapper = true;
      //      this.availableFn = function () { }

    },

    //子类事件绑定若想保留父级的，应该使用该方法
    addEvents: function (events) {
      if (_.isObject(events)) _.extend(this.events, events);
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
      if (this.needRootWrapper) {
        this.$el = $('<div class="view" style="display: none; " id="' + this.id + '"></div>');
        this.$el.html(html);
      } else {
        this.$el = $(html).hide().attr('id', this.id);
      }
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
        if (k == 'datamodel' || k == 'events') {
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
      this.propertys();
      this.setOption(opts);
      this.resetPropery();
      //添加系统级别事件
      this.addEvent();
      //开始创建dom
      this.create();
      this.addSysEvents();

      this.initElement();

      //将当前的ui实例装入容器
      UIContainerUtil.addItem(this.id, this);

    },

    //返回所有实例化的UI组件集合
    getUIContainer: function () {
      return UIContainerUtil.getItem();
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
    },

    //各事件注册点，用于被继承
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

    render: function (callback) {
      data = this.getViewModel() || {};
      var html = this.template;
      if (!this.template) return '';
      if (data) {
        html = _.template(this.template)(data);
      }
      typeof callback == 'function' && callback.call(this);
      return html;
    },

    //刷新根据传入参数判断是否走onCreate事件
    //这里原来的dom会被移除，事件会全部丢失 需要修复*****************************
    refresh: function (needEvent) {
      this.resetPropery();
      if (needEvent) {
        this.create();
      } else {
        this.$el.html(this.render());
      }
      this.initElement();
      if (this.status == 'show') this.show();
      this.trigger('onRefresh');
    },

    show: function () {
      if (!this.wrapper[0] || !this.$el[0]) return;
      //如果包含就不要乱搞了
      if (!$.contains(this.wrapper[0], this.$el[0])) {
        this.wrapper.append(this.$el);
      }

      this.trigger('onPreShow');

      if (this.needAnimat && (this.animateInClass ? this.hasAnimationProperty(this.animateInClass) : (typeof this.animateShowAction == 'function')) && this.status != 'show') {
        this.animateShowAction.call(this, this.$el);
      } else
        this.$el.show();

      this.status = 'show';
      this.bindEvents();
      this.trigger('onShow');
    },

    hide: function () {
      if (!this.$el || this.status !== 'show') return;

      this.trigger('onPreHide');

      if (this.needAnimat && (this.animateOutClass ? this.hasAnimationProperty(this.animateOutClass) : (typeof this.animateShowAction == 'function')) && this.status != 'hide') {
        this.animateHideAction.call(this, this.$el);
      } else
        this.$el.hide();

      this.status = 'hide';
      this.unBindEvents();
      this.removeSysEvents();
      this.trigger('onHide');
    },

    //检测某class是否包含动画特性
    hasAnimationProperty: function (className) {
      var animateProprtys = [
      //有什么判断的便新增
        $.fx.cssPrefix + 'animation-name'
      ];
      var el = $('<div></div>');

      var i, len;

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
      UIContainerUtil.removeItem(this.id);
      this.$el.remove();
      this.trigger('onDestroy');
      delete this;
    },

    getViewModel: function () {
      return this.datamodel;
    },

    setzIndexTop: function (el, level) {
      if (!el) el = this.$el;
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
