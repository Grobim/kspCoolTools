(function() {
  'use strict';

  angular.module('kct.components.persistence.saveManager')
    .factory('BiDirModDepsRef', ['SaveManagerRef', BiDirModDepsRefFactory])
  ;

  function BiDirModDepsRefFactory(SaveManagerRef) {
    return function(depId) {
      return SaveManagerRef.child('biDirModVersionDeps').child(depId);
    };
  }

})();
