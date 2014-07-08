
define([], function () {

  var contentTypeMap = {
    'json': 'application/json; charset=utf-8',
    'jsonp': 'application/json'
  };

  var _getContentType = function (contentType) {
    if (contentType) contentType = contentTypeMap[contentType] ? contentTypeMap[contentType] : contentType;
    return contentType;
  };

  /**
  * AJAX GET方式访问接口
  */
  function get(url, data, callback, error) {
    var opt = _getCommonOpt(url, data, callback, error);
    opt.type = 'GET';
    return _sendReq(opt);
  };

  /**
  * AJAX POST方式访问接口
  */
  function post(url, data, callback, error) {
    var contentType = data.contentType;
    // data = JSON.stringify(data);
    data = JSON.stringify(data);
    var opt = _getCommonOpt(url, data, callback, error);
    opt.type = 'POST';
    opt.dataType = 'json';
    opt.timeout = 30000;
    opt.contentType = _getContentType(contentType) || 'application/json';
    return _sendReq(opt);
  };

  /**
  * 以GET方式跨域访问外部接口
  */
  function jsonp(url, data, callback, error) {
    var opt = _getCommonOpt(url, data, callback, error);
    opt.type = 'GET';
    opt.dataType = 'jsonp';
    opt.crossDomain = true;
    return _sendReq(opt);
  };

  /**
  * 以POST方法跨域访问外部接口
  */
  function cros(url, type, data, callback, error) {
    var contentType = data.contentType;

    if (type.toLowerCase() !== 'get')
    // data = JSON.stringify(data);
      data = JSON.stringify(data);
    var opt = _getCommonOpt(url, data, callback, error);
    opt.type = type;
    opt.dataType = 'json';
    opt.crossDomain = true;
    opt.data = data;
    opt.contentType = _getContentType(contentType) || 'application/json';

    return _sendReq(opt);
  };

  /**
  * AJAX 提交表单,不能跨域
  * param {url} url
  * param {Object} form 可以是dom对象，dom id 或者jquery 对象
  * param {function} callback
  * param {function} error 可选
  */
  function form(url, form, callback, error) {
    var jdom = null, data = '';
    if (typeof form == 'string') {
      jdom = $('#' + form);
    } else {
      jdom = $(form);
    }
    if (jdom && jdom.length > 0) {
      data = jdom.serialize();
    }
    var opt = _getCommonOpt(url, data, callback, error);
    return _sendReq(opt);
  };

  function _sendReq(opt) {
    var sTime = new Date().getTime();
    var obj = {
      url: opt.url,
      type: opt.type,
      dataType: opt.dataType,
      data: opt.data,
      contentType: opt.contentType,
      timeout: opt.timeout || 50000,
      success: function (res) {
        opt.callback(res);
      },
      error: function (err) {
        opt.error && opt.error(err);
      }
    };
    //是否是跨域则加上这条
    if (opt.url.indexOf(window.location.host) === -1) obj.crossDomain = !!opt.crossDomain;
    return $.ajax(obj);
  };

  function _getCommonOpt(url, data, callback, error) {
    return {
      url: url,
      data: data,
      callback: callback,
      error: error
    };
  };

  return {
    get: get,
    post: post,
    jsonp: jsonp,
    cros: cros,
    form: form
  };

});