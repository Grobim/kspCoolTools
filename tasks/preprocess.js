(function() {
  'use strict';

  module.exports = {
    options: {
      context : {
        DEBUG: false
      }
    },
    dist : {
      src : '<%= yeoman.app %>/index.html',
      dest : '.tmp/index.html'
    },
    prod : {
      src : '<%= yeoman.app %>/index.html',
      dest : '.tmp/index.html',
      options : {
        context : {
          'NODE_ENV' : 'production'
        }
      }
    }
  };

})();
