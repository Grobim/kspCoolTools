(function() {
  'use strict';

  angular.module('kct.components.persistence.saveManager')
    .factory('ModVersionsRef', ['SaveManagerRef', ModVersionsRefFactory])
  ;

  function ModVersionsRefFactory(SaveManagerRef) {
    return function(modId) {
      return SaveManagerRef.child('modVersions').child(modId);
    };
  }

})();
