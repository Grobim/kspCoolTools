(function() {
  'use strict';

  angular.module('kct.mocks', [])
    .run(['$window', mockRun])
  ;

  function mockRun($window) {
    $window.MockFirebase.override();
  }

})();
