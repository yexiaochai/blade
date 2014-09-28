define(['AbstractView', 'cHighlight',  'UILoadingLayer','UIWarning404', 'UIAlert', 'UIToast', 'UIPageview'], function (AbstractView, cHighlight, Loading, Warning404, Alert, Toast, UIPageview) {


      var _loading = new Loading();
       var _alert = new Alert();
         var _confirm = new Alert();
         var _toast = new Toast();
         var _warning404 = new Warning404();
         var _pageview = new UIPageview();


  var hljs = new cHighlight();

hljs.registerLanguage("javascript", function(a) {
    return {aliases: ["js"],k: {keyword: "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class",literal: "true false null undefined NaN Infinity",built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require"},c: [{cN: "pi",b: /^\s*('|")use strict('|")/,r: 10}, a.ASM, a.QSM, a.CLCM, a.CBLCLM, a.CNM, {b: "(" + a.RSR + "|\\b(case|return|throw)\\b)\\s*",k: "return throw case",c: [a.CLCM, a.CBLCLM, a.REGEXP_MODE, {b: /</,e: />;/,r: 0,sL: "xml"}],r: 0}, {cN: "function",bK: "function",e: /\{/,c: [a.inherit(a.TM, {b: /[A-Za-z$_][0-9A-Za-z$_]*/}), {cN: "params",b: /\(/,e: /\)/,c: [a.CLCM, a.CBLCLM],i: /["'\(]/}],i: /\[|%/}, {b: /\$[(.]/}, {b: "\\." + a.IR,r: 0}]}
});
hljs.registerLanguage("xml", function(a) {
    var c = "[A-Za-z0-9\\._:-]+";
    var d = {b: /<\?(php)?(?!\w)/,e: /\?>/,sL: "php",subLanguageMode: "continuous"};
    var b = {eW: true,i: /</,r: 0,c: [d, {cN: "attribute",b: c,r: 0}, {b: "=",r: 0,c: [{cN: "value",v: [{b: /"/,e: /"/}, {b: /'/,e: /'/}, {b: /[^\s\/>]+/}]}]}]};
    return {aliases: ["html"],cI: true,c: [{cN: "doctype",b: "<!DOCTYPE",e: ">",r: 10,c: [{b: "\\[",e: "\\]"}]}, {cN: "comment",b: "<!--",e: "-->",r: 10}, {cN: "cdata",b: "<\\!\\[CDATA\\[",e: "\\]\\]>",r: 10}, {cN: "tag",b: "<style(?=\\s|>|$)",e: ">",k: {title: "style"},c: [b],starts: {e: "</style>",rE: true,sL: "css"}}, {cN: "tag",b: "<script(?=\\s|>|$)",e: ">",k: {title: "script"},c: [b],starts: {e: "<\/script>",rE: true,sL: "javascript"}}, {b: "<%",e: "%>",sL: "vbscript"}, d, {cN: "pi",b: /<\?\w+/,e: /\?>/,r: 10}, {cN: "tag",b: "</?",e: "/?>",c: [{cN: "title",b: "[^ /><]+",r: 0}, b]}]}
});
hljs.registerLanguage("markdown", function(a) {
    return {c: [{cN: "header",v: [{b: "^#{1,6}",e: "$"}, {b: "^.+?\\n[=-]{2,}$"}]}, {b: "<",e: ">",sL: "xml",r: 0}, {cN: "bullet",b: "^([*+-]|(\\d+\\.))\\s+"}, {cN: "strong",b: "[*_]{2}.+?[*_]{2}"}, {cN: "emphasis",v: [{b: "\\*.+?\\*"}, {b: "_.+?_",r: 0}]}, {cN: "blockquote",b: "^>\\s+",e: "$"}, {cN: "code",v: [{b: "`.+?`"}, {b: "^( {4}|\t)",e: "$",r: 0}]}, {cN: "horizontal_rule",b: "^[-\\*]{3,}",e: "$"}, {b: "\\[.+?\\][\\(\\[].+?[\\)\\]]",rB: true,c: [{cN: "link_label",b: "\\[",e: "\\]",eB: true,rE: true,r: 0}, {cN: "link_url",b: "\\]\\(",e: "\\)",eB: true,eE: true}, {cN: "link_reference",b: "\\]\\[",e: "\\]",eB: true,eE: true,}],r: 10}, {b: "^\\[.+\\]:",e: "$",rB: true,c: [{cN: "link_reference",b: "\\[",e: "\\]",eB: true,eE: true}, {cN: "link_url",b: "\\s",e: "$"}]}]}
});
hljs.registerLanguage("css", function(a) {
    var b = "[a-zA-Z-][a-zA-Z0-9_-]*";
    var c = {cN: "function",b: b + "\\(",e: "\\)",c: ["self", a.NM, a.ASM, a.QSM]};
    return {cI: true,i: "[=/|']",c: [a.CBLCLM, {cN: "id",b: "\\#[A-Za-z0-9_-]+"}, {cN: "class",b: "\\.[A-Za-z0-9_-]+",r: 0}, {cN: "attr_selector",b: "\\[",e: "\\]",i: "$"}, {cN: "pseudo",b: ":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"}, {cN: "at_rule",b: "@(font-face|page)",l: "[a-z-]+",k: "font-face page"}, {cN: "at_rule",b: "@",e: "[{;]",c: [{cN: "keyword",b: /\S+/}, {b: /\s/,eW: true,eE: true,r: 0,c: [c, a.ASM, a.QSM, a.NM]}]}, {cN: "tag",b: b,r: 0}, {cN: "rules",b: "{",e: "}",i: "[^\\s]",r: 0,c: [a.CBLCLM, {cN: "rule",b: "[^\\s]",rB: true,e: ";",eW: true,c: [{cN: "attribute",b: "[A-Z\\_\\.\\-]+",e: ":",eE: true,i: "[^\\s]",starts: {cN: "value",eW: true,eE: true,c: [c, a.NM, a.QSM, a.ASM, a.CBLCLM, {cN: "hexcolor",b: "#[0-9A-Fa-f]+"}, {cN: "important",b: "!important"}]}}]}]}]}
});
hljs.registerLanguage("json", function(a) {
    var e = {literal: "true false null"};
    var d = [a.QSM, a.CNM];
    var c = {cN: "value",e: ",",eW: true,eE: true,c: d,k: e};
    var b = {b: "{",e: "}",c: [{cN: "attribute",b: '\\s*"',e: '"\\s*:\\s*',eB: true,eE: true,c: [a.BE],i: "\\n",starts: c}],i: "\\S"};
    var f = {b: "\\[",e: "\\]",c: [a.inherit(c, {cN: null})],i: "\\S"};
    d.splice(d.length, 0, b, f);
    return {c: d,k: e,i: "\\S"}
});


  return _.inherit(AbstractView, {

    propertys: function ($super) {
      $super();

         this._loading = _loading;
        this._alert = _alert;
        this._confirm = _confirm;
        this._toast = _toast;
        this._warning404 = _warning404;
        this._pageview = _pageview;

    },

     showMessage: function (message, title, okTxt, okAction) {
        if (typeof message == 'object' && message.message) {
          this._alert.setDatamodel(message);
        } else {
          this._alert.setDatamodel({
            content: message,
            title: title,
            btns: [
              {
                name: (okTxt || '知道了'),
                className: 'cui-btns-ok'
              }
            ]
          },
            okAction
          );
        }
        this._alert.show();
      },

      hideMessage: function () {
        this.alert.hide();
      },

      showConfirm: function (message, title, okFn, cancelFn, okTxt, cancelTxt) {
        //如果传入的是对象的话，直接用作初始化
        if (typeof message == 'object' && message.message) {
          this._confirm.setDatamodel(message);
        } else {
          this._confirm.setDatamodel({
            content: message,
            title: title,
            btns: [
              {
                name: (cancelTxt || '取消'),
                className: 'cui-btns-cancel'
              },
              {
                name: (okTxt || '确定'),
                className: 'cui-btns-ok'
              }
            ]
          },
          okFn,
          cancelFn
          );
        }
        this._confirm.show();
      },

      hideConfirm: function () {
        this._confirm.hide();
      },

      showWarning404: function (callback, showAction, hideAction,  animateSwitch, telAction,datamodel ) {
        if (callback) this._warning404.setDatamodel(datamodel, callback, telAction);
        this.showPageview(this._warning404, showAction, hideAction, animateSwitch);
      },

      hideWarning404: function () {
        this.hidePageview();
      },

      showPageview: function (instance, showAction, hideAction, animateSwitch) {
        this._pageview.addAction(showAction, hideAction);
       this._pageview.animateSwitch = animateSwitch;
        this._pageview.animateShow(instance);
      },

      hidePageview: function () {
        this._pageview.animateHide();
      },

      showToast: function (title, timeout, hideAction, clickToHide) {
        clickToHide = (typeof clickToHide != 'undefined') ? clickToHide : true;
        this._toast.setDatamodel(title, timeout, hideAction, clickToHide);
        this._toast.show();
      },

      hideToast: function () {
        this._toast.hide();
      },

      showLoading: function (message, hideAction) {
        this._loading.setDatamodel(message, hideAction);
        this._loading.show();
      },

      hideLoading: function () {
        this._loading.hide();
      },

    _initHead: function () {

      this.$('header').append($('<i  class="returnico i_bef"></i>'));
      this.$('header').append($('<i class="icon_home i_bef"></i>'));
    },

    events: {
      'click .returnico': function () {
        this.back('index');
      },
      'click .icon_home': function () {
        window.location = '../index.html';
      }
    },

    initialize: function ($super, app, id) {
      $super(app, id);

      this._initHead();
    },

    onPreShow: function ($super) {
      $super();

    },

    show: function ($super) {
      $super();

      hljs.initHighlighting(this);

    }


  });

});
