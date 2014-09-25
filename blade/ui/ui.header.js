define(['UIView', getAppUITemplatePath('ui.header')], function (UIView, template) {

  return _.inherit(UIView, {
    propertys: function ($super) {
      $super();        
      this.template = template;
      //事件机制
      this.events = {
        'click #c-ui-header-home': 'homeAction',
        'click #c-ui-header-tel': 'telAction',
        'click #c-ui-header-return': 'backAction',
        'click .c-ui-header-btn': 'commitAction'
      };
      
      if (this.datamodel && this.datamodel.events)
      {
        if (_.isFunction(this.datamodel.events.customHandler))
        {
          this.events['click #' + this.datamodel.btn.id] =  'customerAction';  
        }
      }
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
      _.extend(this.datamodel, options);
      this.refresh(true);
      this.show();
    },
    
    updateHeader: function(name, val)
    {
      this.set(_.object([name], [val]));
    },
    
    homeAction: function()
    {
      this.datamodel.events.homeHandler.call(this.datamodel.view || this);
    },
    
    telAction: function()
    {
      
    },
    
    backAction: function()
    {
      this.datamodel.events.returnHandler.call(this.datamodel.view || this);
    },
    
    commitAction: function()
    {
      this.datamodel.events.commitHandler.call(this.datamodel.view || this);
    },
    
    customerAction: function()
    {
      this.datamodel.events.customHandler.call(this.datamodel.view || this);
    }
  });
});
