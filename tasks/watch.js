(function() {
  'use strict';

  // Watches files for changes and runs tasks based on the changed files
  module.exports = {
    bower: {
      files: ['bower.json'],
      tasks: ['wiredep']
    },
    js: {
      files: ['<%= yeoman.app %>/{,**/}*.js'],
      tasks: ['newer:jshint:all'],
      options: {
        livereload: '<%= connect.options.livereload %>'
      }
    },
    jsTest: {
      files: ['test/spec/{,**/}*.js'],
      tasks: ['newer:jshint:test', 'karma']
    },
    compass: {
      files: ['<%= yeoman.app %>/{,**/}*.{scss,sass}'],
      tasks: ['compass:server', 'autoprefixer']
    },
    gruntfile: {
      files: ['Gruntfile.js']
    },
    livereload: {
      options: {
        livereload: '<%= connect.options.livereload %>'
      },
      files: [
        '<%= yeoman.app %>/{,**/}*.html',
        '.tmp/styles/{,**/}*.css',
        '<%= yeoman.app %>/images/{,**/}*.{png,jpg,jpeg,gif,webp,svg}'
      ]
    },
    langs: {
      files: ['<%= yeoman.app %>/{,**/}lang/*.json'],
      tasks: ['generateLocales'],
      options: {
        livereload: '<%= connect.options.livereload %>'
      }
    }
  };
})();
