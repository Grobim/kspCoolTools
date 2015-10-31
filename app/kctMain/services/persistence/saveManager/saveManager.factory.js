(function() {
  'use strict';

  angular.module('kct.services.persistence.saveManager')
    .factory('SaveManagerRef', ['$firebaseObject', 'KctRootRef', SaveManagerRef])
  ;

  function SaveManagerRef($firebaseObject, KctRootRef) {
    return $firebaseObject(KctRootRef.child('saveManager'));
  }

})();
