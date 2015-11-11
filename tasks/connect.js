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
          return [
            connect().use(
              '/bower_components',
              connect.static('./bower_components')
            ),
            connect().use(
              '/bower_local',
              connect.static('./bower_local')
            ),
            connect().use(
              '/' + utils.getConfig().app + '/styles',
              connect.static('./' + utils.getConfig().app + '/styles')
            ),
            connect.static('.tmp'),
            connect().use(
              '/',
              connect.static('./' + utils.getConfig().app)
            )
          ];
        }
      }
    },
    test: {
      options: {
        port: 9001,
        middleware: function (connect) {
          return [
            connect.static('.tmp'),
            connect.static('test'),
            connect().use(
              '/bower_components',
              connect.static('./bower_components')
            ),
            connect.static(utils.getConfig().app)
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
