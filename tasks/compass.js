// Compiles Sass to CSS and generates necessary files if requested
(function() {
  'use strict';

  module.exports = {
    options: {
      sassDir: '<%= yeoman.app %>',
      cssDir: '.tmp/styles',
      generatedImagesDir: '.tmp/images/generated',
      imagesDir: '<%= yeoman.app %>/images{,/*}',
      javascriptsDir: '<%= yeoman.app %>',
      fontsDir: '<%= yeoman.app %>/styles/fonts',
      importPath: './bower_components',
      httpImagesPath: '/images',
      httpGeneratedImagesPath: '/images/generated',
      httpFontsPath: '/styles/fonts',
      relativeAssets: false,
      assetCacheBuster: false,
      raw: 'Sass::Script::Number.precision = 10\n'
    },
    dist: {
      options: {
        generatedImagesDir: '<%= yeoman.dist %>/images/generated'
      }
    },
    server : {
      options : {
        sourcemap : true
      }
    },
    e2e : {
      options : {
        sourcemap : true,
        cssDir    : '.e2e/styles',
      }
    }
  };

})();
