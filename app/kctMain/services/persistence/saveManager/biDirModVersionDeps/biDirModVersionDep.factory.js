(function() {
  'use strict';

  angular.module('kct.services.persistence.saveManager')
    .factory('BiDirModVersionDepRef', ['BiDirModVersionDepsRef', BiDirModVersionDepRefFactory])
  ;

  function BiDirModVersionDepRefFactory(BiDirModVersionDepsRef) {
    return function(depId, depVersionId, modId) {
      return new BiDirModVersionDepsRef(depId, depVersionId).child(modId);
    };
  }

})();
