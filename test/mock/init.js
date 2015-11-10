(function() {
  'use strict';

  angular.module('kct.mocks', [])
    .run([
      '$window',
      function mockRun($window) {
        $window.MockFirebase.override();
      }
    ])
  ;


})();
