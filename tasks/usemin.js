// Performs rewrites based on filerev and the useminPrepare configuration
(function() {
  'use strict';

  module.exports = {
    html: ['<%= yeoman.dist %>/{,**/}*.html'],
    css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
    options: {
      assetsDirs: [
        '<%= yeoman.dist %>',
        '<%= yeoman.dist %>/images{,/*}',
        '<%= yeoman.dist %>/styles'
      ],
      patterns: {
        html: [
          [
            /<md-icon[^\>]*[^\>\S]+md-svg-icon=['"]([^'"\)#]+)(#.+)?["']/gm,
            'Update the HTML with the new md-icon images'
          ]
        ]
      }
    }
  };

})();
