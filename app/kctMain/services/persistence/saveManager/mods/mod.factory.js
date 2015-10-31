(function() {
  'use strict';

  angular.module('kct.services.persistence.saveManager')
    .factory('ModRef', ['$firebaseObject', 'ModsRef', ModRef])
  ;

  function ModRef($firebaseObject, ModsRef) {
    return function(modId) {
      return $firebaseObject(ModsRef.$ref().child(modId));
    };
  }

})();
