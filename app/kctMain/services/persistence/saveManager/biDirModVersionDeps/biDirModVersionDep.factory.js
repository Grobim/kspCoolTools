(function() {
  'use strict';

  angular.module('kct.services.persistence.saveManager')
    .factory('BiDirModVersionDepRef', ['SaveManagerRef', BiDirModVersionDepRefFactory])
  ;

  function BiDirModVersionDepRefFactory(SaveManagerRef) {
    return function(modId, modVersionId) {
      return SaveManagerRef.child('biDirModVersionDeps').child(modId).child(modVersionId);
    };
  }

})();
