// Run some tasks in parallel to speed up the build process
(function() {
  'use strict';

  module.exports = {
    server: [
      'compass:server'
    ],
    test: [
      'compass'
    ],
    dist: [
      'compass:dist',
      'imagemin',
      'svgmin'
    ]
  };

})();
