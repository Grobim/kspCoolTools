(function() {
  'use strict';

  angular.module('kct.common')
    .factory('KtbRootRef', ['$window', 'FBURL', KtbRootRef])
    .factory('KtbAuth', ['$firebaseAuth', 'KtbRootRef', KtbAuth])
    ;

  function KtbRootRef($window, FBURL) {
    return new $window.Firebase(FBURL);
  }

  function KtbAuth($firebaseAuth, KtbRootRef) {
    return $firebaseAuth(KtbRootRef);
  }

})();
