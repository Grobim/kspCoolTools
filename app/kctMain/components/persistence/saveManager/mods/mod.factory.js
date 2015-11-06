(function() {
  'use strict';

  angular.module('kct.services.persistence.saveManager')
    .factory('ModRef', ['ModsRef', ModRef])
  ;

  function ModRef(ModsRef) {
    return function(modId) {
      return ModsRef.child(modId);
    };
  }

})();
