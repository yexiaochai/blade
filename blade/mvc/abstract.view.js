//解决低版本android localstorage读写失效问题
window.onunload = function () { };

define([], function () {

  var View = _.inherit({

    //默认属性
    propertys: function () {
      //位置信息
      this.scrollPos = {
        x: 0,
        y: 0
      };
    },

    //创建基础dom结构
    createDom: function (id) {
      this.viewname = id;
      this.id = _.uniqueId('view_');
      this.$el = $('<div class="sub-viewport" page-id="' + id + '" id="' + this.id + '"></div>');
      this.$el.hide();
      this.app.viewport.append(this.$el);
    },

    initInterface: function () {
      var name = '', i, len;
      for (i = 0, len = this.app.interface.length; i < len; i++) {
        name = this.app.interface[i];
        this[name] = $.proxy(this.app[name], this.app);
      }

    },

    initialize: function (app, id) {
      this.propertys();
      this.app = app;
      this.createDom(id);
      this.initInterface();

      //第一个事件点
      this.onCreate();

    },

    //被app重写的方法，调用即执行view onPreShow 事件
    turning: function () {
    },

    //实例化时触发的事件点只会执行一次
    onCreate: function () {
    },

    //每次皆会被执行的方法
    onPreShow: function () {
    },

    //页面显示逻辑，必须手动在 onPreShow 中调用turning
    onShow: function () {
    },

    //load事件
    load: function () {

      //dom检测，防止移动端dom未插入
      if (!this.app.viewport.find('#' + this.id)[0]) {
        this.app.viewport.append(this.$el);
      }

      //公共逻辑处理
      this.onPreShow();

    },

    show: function () {
      //切换页面时，确保当前input失去焦点
      document.activeElement && document.activeElement.blur();
      window.scrollTo(0, 0);

      this.$el.show();
      this.onShow();
      //返回上次记录位置
      this.restoreScrollPos();

      //唤醒dom事件
      this.bindEvents();
    },

    hide: function () {

      this.$el.hide();
      this.onHide();

      //释放所有dom事件
      this.unBindEvents();

    },

    //view刷新
    refresh: function () {
      this.load();
    },

    destroy: function () {
      this.unBindEvents();
      this.$el.remove();
      delete this;
    },

    $: function (selector) {
      return this.$el.find(selector);
    },

    setScrollPos: function (x, y) {
      this.scrollPos = {
        x: x,
        y: y
      };
    },

    //还原到原来的滚动条位置
    restoreScrollPos: function () {
      window.scrollTo(this.scrollPos.x, this.scrollPos.y);
      //      setTimeout($.proxy(function () {
      //        window.scrollTo(this.scrollPos.x, this.scrollPos.y);
      //      }, this), 20);
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
        eventName += '.delegateEvents' + this.id;

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
      this.$el.off('.delegateEvents' + this.id);
      return this;
    }
  });

  return View;
});
