// Test settings
(function() {
  'use strict';

  module.exports = {
    unit : {
      configFile : 'test/karma.conf.js'
    },
    dist : {
      configFile : 'test/karma.dist.conf.js'
    },
    once : {
      configFile : 'test/karma.conf.js',
      singleRun  : true
    }
  };

})();
