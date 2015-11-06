(function() {
  'use strict';

  angular.module('kct.services.persistence.saveManager')
    .factory('ModVersionRef', ['ModVersionsRef', ModVersionFactory])
  ;

  function ModVersionFactory(ModVersionsRef) {
    return function(modId, modsVersionId) {
      return new ModVersionsRef(modId).child(modsVersionId);
    };
  }

})();
