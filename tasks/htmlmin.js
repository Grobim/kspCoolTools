(function() {
  'use strict';

  module.exports = {
    dist: {
      options: {
        collapseWhitespace: true,
        conservativeCollapse: true,
        collapseBooleanAttributes: true,
        removeCommentsFromCDATA: true,
        removeOptionalTags: true
      },
      files: [{
        expand: true,
        cwd: '<%= yeoman.dist %>',
        src: ['*.html', '{,**/}*.html'],
        dest: '<%= yeoman.dist %>'
      }]
    }
  };

})();
