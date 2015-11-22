(function() {
  'use strict';

  module.exports = {
    options : {
      context : {
        DEBUG: false
      }
    },
    app     : {
      src  : '<%= yeoman.app %>/index.html',
      dest : '.tmp/index.html'
    },
    dist    : {
      src     : '<%= yeoman.app %>/index.html',
      dest    : '.tmp/index.html',
      options : {
        context : {
          'TEMPLATES' : true
        }
      }
    },
    prod    : {
      src     : '<%= yeoman.app %>/index.html',
      dest    : '.tmp/index.html',
      options : {
        context : {
          'NODE_ENV'  : 'production',
          'TEMPLATES' : true
        }
      }
    },
    e2e     : {
      src     : '<%= yeoman.app %>/index.html',
      dest    : '.e2e/index.html',
      options : {
        context : {
          'NODE_ENV' : 'e2e'
        }
      }
    },
    e2eDist : {
      src     : '<%= yeoman.app %>/index.html',
      dest    : '.e2e/index.html',
      options : {
        context : {
          'NODE_ENV'  : 'e2e',
          'TEMPLATES' : true
        }
      }
    }
  };

})();
