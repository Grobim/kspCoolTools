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
      'wiredep',
      'concurrent:server',
      'autoprefixer:server',
      'preprocess:dist',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'karma:dist']);
    } 

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
      'generateLocales',
      'wiredep',
      'preprocess:' + ((target === 'prod') ? 'prod' : 'dist'),
      'useminPrepare',
      'concurrent:dist',
      'autoprefixer',
      'concat',
      'copy:dist',
      'cssmin',
      'uglify',
      'filerev',
      'usemin',
      'htmlmin'
    ]);
  });

};
