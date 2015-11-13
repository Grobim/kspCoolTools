(function() {
  'use strict';

  // Watches files for changes and runs tasks based on the changed files
  module.exports = {
    js: {
      files: ['<%= yeoman.app %>/{,**/}*.js'],
      tasks: ['newer:jshint:all'],
      options: {
        livereload: '<%= connect.options.livereload %>'
      }
    },
    compass: {
      files: ['<%= yeoman.app %>/{,**/}*.{scss,sass}'],
      tasks: ['compass:server', 'autoprefixer']
    },
    livereload: {
      options: {
        livereload: '<%= connect.options.livereload %>'
      },
      files: [
        '<%= yeoman.app %>/{,**/}*.html',
        '<%= yeoman.app %>/images/{,**/}*.{png,jpg,jpeg,gif,webp,svg}'
      ]
    },
    preprocess: {
      options : {
        livereload : '<%= connect.options.livereload %>'
      },
      files   : [
        '<%= yeoman.app %>/index.html'
      ],
      tasks   : ['preprocess:dist']
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
