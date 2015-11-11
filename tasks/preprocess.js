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
    dist : {
      src : '<%= yeoman.app %>/index.html',
      dest : '.tmp/index.html'
    }
  };

})();
