(function() {
  'use strict';

  angular.module('kct.components.persistence.saveManager')
    .factory('ModVersionDepsRef', ['SaveManagerRef', ModVersionDepsRefFactory])
  ;

  function ModVersionDepsRefFactory(SaveManagerRef) {
    return function(modId, modVersionId) {
      return SaveManagerRef.child('modVersionDeps').child(modId).child(modVersionId);
    };
  }

})();
