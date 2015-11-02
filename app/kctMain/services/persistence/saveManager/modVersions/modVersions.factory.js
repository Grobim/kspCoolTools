(function() {
  'use strict';

  angular.module('kct.services.persistence.saveManager')
    .factory('ModVersionsRef', ['SaveManagerRef', ModVersionsRefFactory])
  ;

  function ModVersionsRefFactory(SaveManagerRef) {
    return function(modId) {
      return SaveManagerRef.child('modVersions').child(modId);
    };
  }

})();
