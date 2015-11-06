(function() {
  'use strict';

  angular.module('kct.components.persistence.saveManager')
    .factory('ModVersionDepRef', ['ModVersionDepsRef', ModVersionDepRefFactory])
  ;

  function ModVersionDepRefFactory(ModVersionDepsRef) {
    return function(modId, modVersionId, modVersionDepId) {
      return new ModVersionDepsRef(modId, modVersionId).child(modVersionDepId);
    };
  }

})();
