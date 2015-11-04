(function() {
  'use strict';

  angular.module('kct.services.persistence.saveManager')
    .factory('BiDirModVersionDepsRef', ['SaveManagerRef', BiDirModVersionDepsRef])
  ;

  function BiDirModVersionDepsRef(SaveManagerRef) {
    return function(depId, depVersionId) {
      return SaveManagerRef.child('biDirModVersionDeps').child(depId).child(depVersionId);
    };
  }

})();
