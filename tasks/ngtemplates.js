(function() {
  'use strict';

  module.exports = {
    kct : {
      cwd     : '<%= yeoman.app %>',
      src     : 'kctMain/{,**/}*.html',
      dest    : '<%= yeoman.app %>/generated/templates/templates.js',
      options : {
        htmlmin : '<%= htmlmin.dist.options %>'
      }
    }
  };

})();
