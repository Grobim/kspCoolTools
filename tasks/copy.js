// Copies remaining files to places other tasks can use
(function() {
  'use strict';

  module.exports = {
    dist: {
      files: [{
        expand: true,
        dot: true,
        cwd: '<%= yeoman.app %>',
        dest: '<%= yeoman.dist %>',
        src: [
          '*.{ico,png,txt}',
          '.htaccess',
          '*.html',
          'images/{,*/}*.{webp}',
          'styles/fonts/{,*/}*.*',
          'generated/langs/locale-*.json'
        ]
      }, {
        expand: true,
        cwd: '.tmp/images',
        dest: '<%= yeoman.dist %>/images',
        src: ['generated/*']
      }, {
        expand: true,
        cwd: '.',
        src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
        dest: '<%= yeoman.dist %>'
      }, {
        expand: true,
        cwd: 'bower_components/font-awesome/',
        src: 'fonts/*',
        dest: '<%= yeoman.dist %>'
      }]
    },
    prod: {
      files: [{
        expand: true,
        dot: true,
        cwd: '<%= yeoman.app %>',
        dest: '<%= yeoman.dist %>',
        src: [
          '*.{ico,png,txt}',
          '.htaccess',
          '*.html',
          'images/{,*/}*.{webp}',
          'styles/fonts/{,*/}*.*',
          'generated/langs/locale-*.json'
        ]
      }, {
        expand: true,
        cwd: '.tmp/images',
        dest: '<%= yeoman.dist %>/images',
        src: ['generated/*']
      }, {
        expand: true,
        cwd: '.',
        src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
        dest: '<%= yeoman.dist %>'
      }]
    },
    styles: {
      expand: true,
      cwd: '<%= yeoman.app %>/styles',
      dest: '.tmp/styles/',
      src: '{,*/}*.css'
    }
  };

})();
