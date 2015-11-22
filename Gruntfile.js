// Generated on 2015-10-30 using generator-angularfire 1.0.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var _ = require('lodash'),
      utils = require('./lib/grunt-helpers')(),
      mergedConf = _.assign(
        {
          yeoman : utils.getConfig()
        },
        utils.mergeTasksConfig()
      );

  grunt.initConfig(mergedConf);

  grunt.registerTask('generateLocales', 'Generate locale files', function() {
    var taskModule      = require('./lib/grunt-custom-tasks/generate-locales')(grunt),
        generateLocales = taskModule.generateLocales;

    generateLocales(this.options({
      cwd : process.cwd()
    }));

  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'generateLocales',
      'wiredep:app',
      'wiredep:sass',
      'concurrent:server',
      'autoprefixer:server',
      'preprocess:app',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'karma:dist']);
    } 

    grunt.task.run('preprocess:app');
    grunt.task.run('wiredep:test');

    if (target === 'once') {
      grunt.task.run('karma:once');
    } else {
      grunt.task.run([
        'connect:test',
        'karma:unit'
      ]);
    }
  });

  grunt.registerTask('build', function(target) {
    grunt.task.run([
      'clean:dist',
      'clean:e2e',
      'generateLocales',
      'wiredep:app',
      'wiredep:sass',
      'preprocess:' + ((!!target && target.length) ? target : 'dist'),
      'useminPrepare:' + ((!!target && target.length) ? target : 'dist'),
      'concurrent:dist',
      'autoprefixer:dist',
      'ngtemplates',
      'concat',
      'copy:dist',
      'cssmin',
      'uglify',
      'filerev',
      'usemin'
    ]);
  });

  grunt.registerTask('e2e', function(target) {
    if (target === 'dist') {
      return grunt.task.run([
        'build:e2eDist',
        'connect:e2eDist',
        'protractor:e2e'
      ]);
    }
    grunt.task.run([
      'clean:e2e',
      'generateLocales',
      'preprocess:e2e',
      'compass:e2e',
      'connect:e2e',
      'protractor:dist'
    ]);
  });

};
