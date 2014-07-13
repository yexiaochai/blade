define([], function () {
  return _.inherit({
    propertys: function () {
      this.isError = false;
    },

    initialize: function (opts) {
      this.propertys();
      this.handleOpts(opts);
      this.checkWrapperDisplay();
      this.init();
    },

    //用以解决父容器不显示导致高度失效问题
    checkWrapperDisplay: function () {
      //如果容器高度为0，一定是父容器高度不显示导致
      if (this.isError) return;
      this.TIMERRESCOUNT = 0;
      this.TIMERRES && clearInterval(this.TIMERRES);
      if ($(this.imgs[0]).offset().top == 0) {
        this.isError = true;
        this.TIMERRES = setInterval($.proxy(function () {
          console.log('检测img offset.....');
          this.TIMERRESCOUNT++;
          if ($(this.imgs[0]).offset().top > 0 || this.TIMERRESCOUNT > 1000) {
            this.TIMERRES && clearInterval(this.TIMERRES);
            console.log('检测img offset结束，重设高度');
            this.isError = false;
            this.refresh();
          }
        }, this), 100);
      }
    },

    handleOpts: function (opts) {
      this.isError = false;
      if (!opts || !opts.imgs || !opts.imgs.length) { this.isError = true; return };
      this.imgs = opts.imgs;
      this.container = opts.container || $(window);
      this.width = opts.width;
      this.height = opts.height;

      this.loadingImg = opts.loadingImg || 'http://pic.c-ctrip.com/vacation_v2/h5/group_travel/no_product_pic.png';
      this.loadingBg = opts.loadingBg || '#ebebeb';

      this.needWrapper = false;
      if (this.width || this.height)
        this.needWrapper = true;

      this.wrapper = opts.wrapper || '<div class="cui_lazyload_wrapper" style="text-align: center; vertical-align: middle; "></div>';
      this.imgContainer = {};
    },

    init: function () {
      if (this.isError) return;
      this.initImgContainer();
      this.lazyLoad();
      this.bindEvents();
    },

    refresh: function (opts) {
      if (opts) {
        this.handleOpts(opts);
      }
      this.init();
    },

    bindEvents: function () {
      if (this.isError) return;

      this.destroy();

      //为container绑定事件
      this.container.on('scroll.imglazyload', $.proxy(function () {
        this.lazyLoad();
      }, this));

      $(window).on('resize.imglazyload', $.proxy(function () {
        this.initImgContainer();
      }, this));

      //图片加载失败相关逻辑

    },

    initImgContainer: function () {
      if (this.isError) return;

      var el, i, len, offset;
      for (i = 0, len = this.imgs.length; i < len; i++) {
        el = $(this.imgs[i]);
        if (!el.attr('data-src') || el.attr('data-src') == '' || el.attr('data-load') == '1') continue;

        offset = el.offset();
        if (!this.imgContainer[offset.top]) {
          this.imgContainer[offset.top] = [];
        }
        this.imgContainer[offset.top].push(el);

      }
    },

    //实际操作图片处
    _handleImg: function (tmpImg) {
      var sysImg, wrapper, scope;
      if (tmpImg.attr('data-src') && tmpImg.attr('data-src') != '') {
        if (this.needWrapper) {
          wrapper = $(this.wrapper);
          wrapper.css({
            width: this.width + 'px',
            height: this.height + 'px',
            'background-color': this.loadingBg
          });
          wrapper.insertBefore(tmpImg);
          wrapper.append(tmpImg);
        }

        sysImg = $(new Image());

        if (!tmpImg.attr('src'))
          tmpImg.attr('src', this.loadingImg);

        sysImg.on('error', function () {
          tmpImg.attr('src', this.loadingImg);
        }).on('load', function () {
          tmpImg.attr('src', tmpImg.attr('data-src'));
          tmpImg.attr('data-load', '1');

          setTimeout(function () {
            if (wrapper && wrapper[0]) {
              tmpImg.insertBefore(wrapper);
              wrapper.remove();
            }
          }, 1);
        }).attr('src', tmpImg.attr('data-src'));

      }
    },

    lazyLoad: function () {
      if (this.isError) return;

      var height = this.container.height();
      var srollHeight = this.container.scrollTop();
      var k, _imgs, tmpImg, i, len;

      for (k in this.imgContainer) {
        if (parseInt(k) < srollHeight + height) {
          _imgs = this.imgContainer[k];
          for (i = 0, len = _imgs.length; i < len; i++) {
            tmpImg = $(_imgs[i]);
            this._handleImg(tmpImg);
          }
          delete this.imgContainer[k];
        }
      } // for
    },

    destroy: function () {
      if (this.isError) return;

      //为container绑定事件
      this.container.off('.imglazyload');

      $(window).off('.imglazyload');
    }

  });


});
