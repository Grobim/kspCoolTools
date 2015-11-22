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
        index: 'index.html',
        middleware: getMiddleWares('.tmp')
      }
    },
    e2e: {
      options: {
        base: '.e2e',
        port: 9002,
        middleware: getMiddleWares('.e2e')
      }
    },
    e2eDist: {
      options: {
        base: '<%= yeoman.dist %>',
        livereload: false
      }
    },
    test: {
      options: {
        port: 9001,
        middleware: function (connect) {
          var serveStatic = require('serve-static'),
              app = connect();
          return [
            serveStatic('.tmp'),
            serveStatic('test'),
            app.use(
              '/bower_components',
              serveStatic('./bower_components')
            ),
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
              '/generated/langs',
              serveStatic('./' + utils.getConfig().app + '/generated/langs')
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

  function getMiddleWares(target) {
    return function (connect) {
      var serveStatic = require('serve-static'),
          app = connect();
      return [
        serveStatic(target),
        app.use(
          '/bower_components',
          serveStatic('./bower_components')
        ),
        app.use(
          '/bower_local',
          serveStatic('./bower_local')
        ),
        app.use(
          '/styles',
          serveStatic(target + '/styles')
        ),
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
          '/generated/langs',
          serveStatic('./' + utils.getConfig().app + '/generated/langs')
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
    };
  }

  

})();
