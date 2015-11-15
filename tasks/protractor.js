(function() {
  'use strict';

  module.exports =  {
    options: {
      // Location of your protractor config file
      configFile: 'test/protractor-conf.js',
   
      // Do you want the output to use fun colors?
      noColor: false,
   
      // Set to true if you would like to use the Protractor command line debugging tool
      // debug: true,
   
      // Additional arguments that are passed to the webdriver command
      args: { },

      keepAlive: false,
      debug : false,
      webdriverManagerUpdate : true
    },
    dist: {},
    e2e: {
      options: {
        configFile: 'test/protractor-conf.dist.js',
      }
    }
  };

})();
