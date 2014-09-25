
//继承相关逻辑
(function () {

  // 全局可能用到的变量
  var arr = [];
  var slice = arr.slice;
  /**
  * inherit方法，js的继承，默认为两个参数
  *
  * @param  {function} origin  可选，要继承的类
  * @param  {object}   methods 被创建类的成员，扩展的方法和属性
  * @return {function}         继承之后的子类
  */
  _.inherit = function (origin, methods) {

    // 参数检测，该继承方法，只支持一个参数创建类，或者两个参数继承类
    if (arguments.length === 0 || arguments.length > 2) throw '参数错误';

    var parent = null;

    // 将参数转换为数组
    var properties = slice.call(arguments);

    // 如果第一个参数为类（function），那么就将之取出
    if (typeof properties[0] === 'function')
      parent = properties.shift();
    properties = properties[0];

    // 创建新类用于返回
    function klass() {
      if (_.isFunction(this.initialize))
        this.initialize.apply(this, arguments);
    }

    klass.superclass = parent;

    // 父类的方法不做保留，直接赋给子类
    // parent.subclasses = [];

    if (parent) {
      // 中间过渡类，防止parent的构造函数被执行
      var subclass = function () { };
      subclass.prototype = parent.prototype;
      klass.prototype = new subclass();

      // 父类的方法不做保留，直接赋给子类
      // parent.subclasses.push(klass);
    }

    var ancestor = klass.superclass && klass.superclass.prototype;
    for (var k in properties) {
      var value = properties[k];

      //满足条件就重写
      if (ancestor && typeof value == 'function') {
        var argslist = /^\s*function\s*\(([^\(\)]*?)\)\s*?\{/i.exec(value.toString())[1].replace(/\s/g, '').split(',');
        //只有在第一个参数为$super情况下才需要处理（是否具有重复方法需要用户自己决定）
        if (argslist[0] === '$super' && ancestor[k]) {
          value = (function (methodName, fn) {
            return function () {
              var scope = this;
              var args = [
                function () {
                  return ancestor[methodName].apply(scope, arguments);
                }
              ];
              return fn.apply(this, args.concat(slice.call(arguments)));
            };
          })(k, value);
        }
      }

      //此处对对象进行扩展，当前原型链已经存在该对象，便进行扩展
      if (_.isObject(klass.prototype[k]) && _.isObject(value) && (typeof klass.prototype[k] != 'function' && typeof value != 'fuction')) {
        //原型链是共享的，这里处理逻辑要改
        var temp = {};
        _.extend(temp, klass.prototype[k]);
        _.extend(temp, value);
        klass.prototype[k] = temp;
      } else {
        klass.prototype[k] = value;
      }

    }

    if (!klass.prototype.initialize)
      klass.prototype.initialize = function () { };

    klass.prototype.constructor = klass;

    return klass;
  };

})();

//基础方法
(function () {

  // //获取url参数
  // //这个方法还是有问题
  _.getUrlParam = function (url, key) {
    if (!url) url = window.location.href;

    var searchReg = /([^&=?]+)=([^&]+)/g;
    var urlReg = /\/+.*\?/;
    var arrayReg = /(.+)\[\]$/;
    var urlParams = {};
    var match, name, value, isArray;

    url = decodeURIComponent(url);
    while (match = searchReg.exec(url)) {
      name = match[1];
      value = match[2];
      isArray = name.match(arrayReg);
      //处理参数为url这种情况
      if (urlReg.test(value)) {
        urlParams[name] = url.substr(url.indexOf(value));
        break;
      } else {
        if (isArray) {
          name = isArray[1];
          urlParams[name] = urlParams[name] || [];
          urlParams[name].push(value);
        } else {
          urlParams[name] = value;
        }
      }
    }

    return key ? urlParams[key] : urlParams;
  };

  _.removeAllSpace = function (str) {
    return str.replace(/\s+/g, "");
  };

  })();

//flip手势工具
(function () {

    //偏移步长
    var step = 20;

    var touch = {};
    var down = 'touchstart';
    var move = 'touchmove';
    var up = 'touchend';
    if (!('ontouchstart' in window)) {
      down = 'mousedown';
      move = 'mousemove';
      up = 'mouseup';
    }

    //简单借鉴ccd思维做简要处理
    function swipeDirection(x1, x2, y1, y2, sensibility) {

      //x移动的步长
      var _x = Math.abs(x1 - x2);
      //y移动步长
      var _y = Math.abs(y1 - y2);
      var dir = _x >= _y ? (x1 - x2 > 0 ? 'left' : 'right') : (y1 - y2 > 0 ? 'up' : 'down');

      //设置灵敏度限制
      if (sensibility) {
        if (dir == 'left' || dir == 'right') {
          if ((_y / _x) > sensibility) dir = '';
        } else if (dir == 'up' || dir == 'down') {
          if ((_x / _y) > sensibility) dir = '';
        }
      }
      return dir;
    }

    //sensibility设置灵敏度，值为0-1
    function flip(el, dir, fn, noDefault, sensibility) {
      if (!el) return;

      el.on(down, function (e) {
        var pos = (e.touches && e.touches[0]) || e;
        touch.x1 = pos.pageX;
        touch.y1 = pos.pageY;

      }).on(move, function (e) {
        var pos = (e.touches && e.touches[0]) || e;
        touch.x2 = pos.pageX;
        touch.y2 = pos.pageY;

        //如果view过长滑不动是有问题的
        if (!noDefault) { e.preventDefault(); }
      }).on(up, function (e) {


        if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > step) ||
        (touch.y2 && Math.abs(touch.y1 - touch.y2) > step)) {
          var _dir = swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2, sensibility);
          if (dir === _dir) {
            typeof fn == 'function' && fn();
          }
        } else {
          //tap的情况
          if (dir === 'tap') {
            typeof fn == 'function' && fn();
          }
        }
      });
    }

    function flipDestroy(el) {
      if (!el) return;
      el.off(down).off(move).off(up);
    }

    _.flip = flip;
    _.flipDestroy = flipDestroy;

  })();

//日期操作类
(function () {

  /**
  * @description 静态日期操作类，封装系列日期操作方法
  * @description 输入时候月份自动减一，输出时候自动加一
  * @return {object} 返回操作方法
  */
  _.dateUtil = {
    /**
    * @description 数字操作，
    * @return {string} 返回处理后的数字
    */
    formatNum: function (n) {
      if (n < 10) return '0' + n;
      return n;
    },
    /**
    * @description 将字符串转换为日期，支持格式y-m-d ymd (y m r)以及标准的
    * @return {Date} 返回日期对象
    */
    parse: function (dateStr, formatStr) {
      if (typeof dateStr === 'undefined') return null;
      if (typeof formatStr === 'string') {
        var _d = new Date(formatStr);
        //首先取得顺序相关字符串
        var arrStr = formatStr.replace(/[^ymd]/g, '').split('');
        if (!arrStr && arrStr.length != 3) return null;

        var formatStr = formatStr.replace(/y|m|d/g, function (k) {
          switch (k) {
            case 'y': return '(\\d{4})';
            case 'm': ;
            case 'd': return '(\\d{1,2})';
          }
        });

        var reg = new RegExp(formatStr, 'g');
        var arr = reg.exec(dateStr)

        var dateObj = {};
        for (var i = 0, len = arrStr.length; i < len; i++) {
          dateObj[arrStr[i]] = arr[i + 1];
        }
        return new Date(dateObj['y'], dateObj['m'] - 1, dateObj['d']);
      }
      return null;
    },
    /**
    * @description将日期格式化为字符串
    * @return {string} 常用格式化字符串
    */
    format: function (date, format) {
      if (arguments.length < 2 && !date.getTime) {
        format = date;
        date = new Date();
      }
      typeof format != 'string' && (format = 'Y年M月D日 H时F分S秒');
      return format.replace(/Y|y|M|m|D|d|H|h|F|f|S|s/g, function (a) {
        switch (a) {
          case "y": return (date.getFullYear() + "").slice(2);
          case "Y": return date.getFullYear();
          case "m": return date.getMonth() + 1;
          case "M": return _.dateUtil.formatNum(date.getMonth() + 1);
          case "d": return date.getDate();
          case "D": return _.dateUtil.formatNum(date.getDate());
          case "h": return date.getHours();
          case "H": return _.dateUtil.formatNum(date.getHours());
          case "f": return date.getMinutes();
          case "F": return _.dateUtil.formatNum(date.getMinutes());
          case "s": return date.getSeconds();
          case "S": return _.dateUtil.formatNum(date.getSeconds());
        }
      });
    },
    // @description 是否为为日期对象，该方法可能有坑，使用需要慎重
    // @param year {num} 日期对象
    // @return {boolean} 返回值
    isDate: function (d) {
      if ((typeof d == 'object') && (d instanceof Date)) return true;
      return false;
    },
    // @description 是否为闰年
    // @param year {num} 可能是年份或者为一个date时间
    // @return {boolean} 返回值
    isLeapYear: function (year) {
      //传入为时间格式需要处理
      if (_.dateUtil.isDate(year)) year = year.getFullYear()
      if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) return true;
      return false;
    },

    // @description 获取一个月份的天数
    // @param year {num} 可能是年份或者为一个date时间
    // @param year {num} 月份
    // @return {num} 返回天数
    getDaysOfMonth: function (year, month) {
      //自动减一以便操作
      month--;
      if (_.dateUtil.isDate(year)) {
        month = year.getMonth(); //注意此处月份要加1，所以我们要减一
        year = year.getFullYear();
      }
      return [31, _.dateUtil.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    },

    // @description 获取一个月份1号是星期几，注意此时的月份传入时需要自主减一
    // @param year {num} 可能是年份或者为一个date时间
    // @param year {num} 月份
    // @return {num} 当月一号为星期几0-6
    getBeginDayOfMouth: function (year, month) {
      //自动减一以便操作
      month--;
      if ((typeof year == 'object') && (year instanceof Date)) {
        month = year.getMonth();
        year = year.getFullYear();
      }
      var d = new Date(year, month, 1);
      return d.getDay();
    }
  };

})();

//封装setTimeout
(function() {

  var TimerRes = {};

  _.setInterval = function(fn, timeout, ns) {
    if (!ns) ns = 'g';
    if (!TimerRes[ns]) TimerRes[ns] = [];
    TimerRes[ns].push(setInterval(fn, timeout));
  };

  _.clearInterval = function (rid, ns) {
    var k, v, k1, i, len, i1, len1, resArr, j;

    if(typeof rid == 'number'){
      //1 clearInterval， 清除数组
      for(k in TimerRes) {
        v = TimerRes[k];
        for(i = 0, len = v.length; i < len; i++) {
          if(rid == v[i]) {
            v.splice(i, 1)
            clearInterval(rid);
            return;
          }
        }
      }
    }

    if(typeof rid == 'string'){ 
      ns = rid;
      resArr = TimerRes[ns];
      j = resArr.length;
      while(j != 0){
       _.clearInterval(resArr[resArr.length - 1]);
      }
    }

    if(arguments.length == 0) {
       for(k1 in TimerRes) {
       _.clearInterval(k1);     
       }
    }
    
  }

})();