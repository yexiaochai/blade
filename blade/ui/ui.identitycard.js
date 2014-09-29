
define(['UILayer', getAppUITemplatePath('ui.identitycard')], function (UILayer, template) {
  return _.inherit(UILayer, {
    propertys: function ($super) {
      $super();

      this.template = template;
      this.needMask = false;
      this.needReposition = false;

      this.events = {
        'click .cui-hd span': 'closeAction',
        'click .cui-bd li': 'itemAction'
      };

      //目标元素，必填
      this.targetEl = null;
      this.emptyEl = $('<div style="height: 1000px"></div>');

    },

    deleteAction: function () {
      console.log('delete');
    },

    itemClickAction: function (val) {
      console.log(val);
    },

    itemAction: function (e) {
      var el = $(e.currentTarget);
      el.addClass('cui-on-t');
      setTimeout(function () {
        el.removeClass('cui-on-t');
      }, 150);

      if (el.hasClass('cui-wrapper-delete')) {
        this.deleteAction();
        return;
      }
      var val = el.html();
      if (el.hasClass('cui-wrapper-x')) val = 'X';

      this.itemClickAction(val);
    },

    closeAction: function () {
      this.$el.addClass("cui-keyboard-hide");
      setTimeout($.proxy(function () {
        this.hide();
      }, this), 200);
    },

    initialize: function ($super, opts) {
      $super(opts);
    },

    createRoot: function (html) {
      this.$el = $(html).hide().attr('id', this.id);
    },

    initElement: function () {
      this.el = this.$el;
    },

    _scrollToTarget: function () {
      var offset = this.targetEl.offset();

      window.scrollTo(0, offset.top - 50);
      this.$el.removeClass('cui-keyboard-hide');

      //      $.scrollTo({ endY: (offset.top - 50) });

    },

    addEvent: function ($super) {
      $super();
      this.on('onCreate', function () {
        this.$el.removeClass('cui-layer');
        this.$el.css({ position: 'fixed' });
      });

      this.on('onShow', function () {
        this.setzIndexTop(this.$el);

        $('body').append(this.emptyEl);
        this._scrollToTarget();
      });

      this.on('onHide', function () {
        this.$el.addClass('cui-keyboard-hide');
        this.emptyEl.remove();
      });
    }

  });

});
