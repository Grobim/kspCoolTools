(function() {
  'use strict';

  angular.module('kct.services.persistence.saveManager')
    .factory('ModsRef', ['SaveManagerRef', ModsRefFactory])
  ;

  function ModsRefFactory(SaveManagerRef) {
    return SaveManagerRef.child('mods');
  }

})();
