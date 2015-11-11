(function() {
  'use strict';

  angular.module('kct.common')
    .service('firebaseTime', firebaseTimeService)
  ;

  function firebaseTimeService($window) {
    return $window.Firebase.ServerValue.TIMESTAMP;
  }

})();
