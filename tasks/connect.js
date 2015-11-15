(function() {

  'use strict';

  var utils = require('../lib/grunt-helpers')(),
      serveMiddleWare = _serveMiddleWare;

  // The actual grunt server settings
  module.exports = {
    options: {
      port: 9000,
      // Change this to '0.0.0.0' to access the server from outside.
      hostname: 'localhost',
      livereload: 35729
    },
    livereload: {
      options: {
        base: '.tmp',
        open: true,
        middleware: serveMiddleWare
      }
    },
    e2e: {
      options: {
        base: '.tmp',
        port: 9002,
        middleware: serveMiddleWare
      }
    },
    test: {
      options: {
        port: 9001,
        middleware: function (connect) {
          var serveStatic = require('serve-static');
          return [
            serveStatic('.tmp'),
            serveStatic('test'),
            connect().use(
              '/bower_components',
              serveStatic('./bower_components')
            ),
            serveStatic(utils.getConfig().app)
          ];
        }
      }
    },
    dist: {
      options: {
        open: true,
        base: '<%= yeoman.dist %>',
        livereload: false
      }
    }
  };

  function _serveMiddleWare(connect) {
    var serveStatic = require('serve-static'),
        app = connect();
    return [
      app.use(
        '/bower_components',
        serveStatic('./bower_components')
      ),
      app.use(
        '/bower_local',
        serveStatic('./bower_local')
      ),
      app.use(
        '/' + utils.getConfig().app + '/styles',
        serveStatic('./' + utils.getConfig().app + '/styles')
      ),
      serveStatic('.tmp'),
      app.use(
        '/kctAngularFireInterceptor',
        serveStatic('./' + utils.getConfig().app + '/kctAngularFireInterceptor')
      ),
      app.use(
        '/kctCommon',
        serveStatic('./' + utils.getConfig().app + '/kctCommon')
      ),
      app.use(
        '/kctMain',
        serveStatic('./' + utils.getConfig().app + '/kctMain')
      ),
      app.use(
        '/kctProfiles',
        serveStatic('./' + utils.getConfig().app + '/kctProfiles')
      ),
      app.use(
        '/langs',
        serveStatic('./' + utils.getConfig().app + '/langs')
      ),
      app.use(
        '/images',
        serveStatic('./' + utils.getConfig().app + '/images')
      ),
      app.use(
        '/fonts',
        serveStatic('./bower_components/font-awesome/fonts')
      )
    ];
  }

})();
