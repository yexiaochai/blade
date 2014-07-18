define([], function () {

  return _.inherit({
    
    propertys: function () {
      
    },

    initialize: function (opts) {
      this.propertys();
      this.handleOpts(opts);

    },

    handleOpts: function (opts) {
      _.extend(this, opts);

    }

  });


});
