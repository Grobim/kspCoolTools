(function() {
  'use strict';

  module.exports = {
    options: {
      context : {
        DEBUG: false
      }
    },
    prod : {
      src : '<%= yeoman.app %>/index.html',
      dest : '.tmp/index.html',
      options : {
        context : {
          'NODE_ENV' : 'production'
        }
      }
    },
    e2e : {
      src : '<%= yeoman.app %>/index.html',
      dest : '.e2e/index.html',
      options : {
        context : {
          'NODE_ENV' : 'e2e'
        }
      }
    },
    dist : {
      src : '<%= yeoman.app %>/index.html',
      dest : '.tmp/index.html'
    }
  };

})();
