(function() {
  'use strict';

  angular.module('kct.components.persistence.saveManager')
    .factory('ModVersionRef', [
      'ModVersionsRef',
      ModVersionRefFactory
    ])
  ;

  function ModVersionRefFactory(ModVersionsRef) {
    return function(modId, modsVersionId) {
      return new ModVersionsRef(modId).child(modsVersionId);
    };
  }

})();
