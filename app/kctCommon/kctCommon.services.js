(function() {
  'use strict';

  angular.module('kct.common')
    .factory('KctRootRef', ['$window', 'FBURL', KctRootRef])
    .factory('KctAuth', ['$firebaseAuth', 'KctRootRef', KctAuth])
    ;

  function KctRootRef($window, FBURL) {
    return new $window.Firebase(FBURL);
  }

  function KctAuth($firebaseAuth, KctRootRef) {
    return $firebaseAuth(KctRootRef);
  }

})();
