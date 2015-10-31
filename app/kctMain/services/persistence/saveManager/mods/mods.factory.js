(function() {
  'use strict';

  angular.module('kct.services.persistence.saveManager')
    .factory('ModsRef', ['$firebaseObject', 'SaveManagerRef', ModsRefFactory])
  ;

  function ModsRefFactory($firebaseObject, SaveManagerRef) {
    return $firebaseObject(SaveManagerRef.$ref().child('mods'));
  }

})();
