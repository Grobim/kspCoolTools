(function() {
  'use strict';

  angular.module('kct.components.persistence.saveManager')
    .factory('BiDirModVersionDepsRef', ['BiDirModDepsRef', BiDirModVersionDepsRef])
  ;

  function BiDirModVersionDepsRef(BiDirModDepsRef) {
    return function(depId, depVersionId) {
      return new BiDirModDepsRef(depId).child(depVersionId);
    };
  }

})();
