define(['UIView', getAppUITemplatePath('ui.header')], function (UIView, template) {

  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();        
      this.template = template;
      //事件机制
      this.events = {
        'click [tagname]': 'clickAction'        
      }; 
    },
    
    initialize: function ($super, opts)
    {      
      $super(opts);
      this.rootBox = this.wrapper = opts.root;
      this.show();      
    },
    
    show: function($super)
    {
      this.wrapper.empty();
      $super();   
    },

    createRoot: function (html) {
      this.$el = $(html);
    },

    initElement: function () {
      this.root = this.wrapper;
    },
    
    set: function(options)
    {
      _.extend(this.datamodel, this.transformdata(options));
      this.refresh(true);
      this.show();
    },
    
    updateHeader: function(name, val)
    {
      if (_.isObject(name))
      {
        this.set(name)
      } else {
        this.set(_.object([name], [val]));
      }
    },
    
    clickAction: function(e)
    {
      var tagname = $(e.target).attr('tagname');
      var callbackItem = this.findcallback(tagname, this.datamodel.left) || this.findcallback(tagname, this.datamodel.centerButtons) || this.findcallback(tagname, this.datamodel.right);
      if (callbackItem && _.isFunction(callbackItem.callback)) {
        callbackItem.callback.call(this.datamodel.view || this);
      }
    },
    
    findcallback: function(tagname, itemArray)
    {
      return _.find(itemArray, function(item){
        return item.tagname == tagname;
      });  
    },
    
    transformdata: function(headData)
    {
      var events = headData.events
      var head = {
        'left': [],
        'center': [],
        'centerButtons': [],
        'right': []
      }, self = headData.view || this;

      if (headData.back) {
        head.left.push({
          'tagname': 'back',
          'callback': events.returnHandler
        });                
      }
      if (headData.title) {
        head.center.push({'tagname': 'title', 'value': headData.title});
      }
      if (headData.subtitle) {
        head.center.push({'tagname': 'subtitle', 'value': headData.subtitle});
      }
      if (headData.btn) {
        if (_.isFunction(events.commitHandler)) {
          head.right.push({'tagname': 'commit','value': headData.btn.title, 'callback': events.commitHandler});          
        }
        if (_.isFunction(events.searchHandler)) {
          head.right.push({'tagname': 'search', 'value': headData.btn.title, 'callback': events.searchHandler});          
        }
      }
      if (headData.tel) {
        head.right.push({'tagname': 'call'});
      }
      if (headData.home) {
        head.right.push({'tagname': 'home'});
      }
      if (headData.citybtn) {
        var cityBynobj = {
          "tagname": "cityChoose",
          "value": headData.citybtn,
          "a_icon": "icon_arrowx",
          "i_icon": "icon_arrowx.png",
          'callback': events.citybtnHandler
        }
        if (headData.citybtnImagePath) {
          cityBynobj.imagePath = headData.citybtnImagePath;
          if (headData.citybtnPressedImagePath) {
            cityBynobj.pressedImagePath = headData.citybtnPressedImagePath;
          } else {
            cityBynobj.pressedImagePath = cityBynobj.imagePath;
          }
        }
        if (headData.citybtnIcon) {
          cityBynobj.a_icon = cityBynobj.i_icon = headData.citybtnIcon;
        }
        head.centerButtons.push(cityBynobj);        
      }      
      if (headData.moreMenus) {        
        head.right.push({ 'tagname': 'more'});        
      }
      if (headData.moreRightMenus) {        
        head.right.concat(headData.moreRightMenus)
      }
	  return head;
    }    
  });
});
