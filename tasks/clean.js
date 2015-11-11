// Empties folders to start fresh
(function() {
  'use strict';

  module.exports = {
    dist: {
      files: [{
        dot: true,
        src: [
          '.tmp',
          '<%= yeoman.dist %>/{,*/}*',
          '!<%= yeoman.dist %>/.git{,*/}*'
        ]
      }]
    },
    server: '.tmp',
    index : '.tmp/index.html'
  };

})();
