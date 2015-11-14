(function() {
  'use strict';
  var utils = require('../lib/grunt-helpers')();
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
        middleware: function (connect) {
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
              '/',
              serveStatic('./' + utils.getConfig().app)
            ),
            app.use(
              '/fonts',
              serveStatic('./bower_components/font-awesome/fonts')
            )
          ];
        }
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
})();
