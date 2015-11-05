(function() {
  'use strict';

  angular.module('kct.services.persistence.saveManager')
    .factory('BiDirModVersionDepsRef', ['BiDirModDepsRef', BiDirModVersionDepsRef])
  ;

  function BiDirModVersionDepsRef(BiDirModDepsRef) {
    return function(depId, depVersionId) {
      return new BiDirModDepsRef(depId).child(depVersionId);
    };
  }

})();
