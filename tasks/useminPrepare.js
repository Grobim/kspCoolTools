// Reads HTML for usemin blocks to enable smart builds that automatically
// concat, minify and revision files. Creates configurations in memory so
// additional tasks can operate on them
(function() {
  'use strict';

  module.exports = {
    options: {
      dest: '<%= yeoman.dist %>'
    },
    dist    : {
      src: '.tmp/index.html',
      options: {
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },
    prod    : {
      src: '.tmp/index.html',
      options: {
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },
    e2e     : {
      src: '.e2e/index.html',
      options: {
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },
    e2eDist : {
      src: '.e2e/index.html',
      options: {
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    }
  };

})();
