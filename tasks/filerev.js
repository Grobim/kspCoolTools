// Renames files for browser caching purposes
(function() {
  'use strict';

  module.exports = {
    dist: {
      src: [
        '<%= yeoman.dist %>/scripts/{,*/}*.js',
        '<%= yeoman.dist %>/styles/{,*/}*.css',
        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
        '<%= yeoman.dist %>/styles/fonts/*'
      ]
    }
  };

})();
