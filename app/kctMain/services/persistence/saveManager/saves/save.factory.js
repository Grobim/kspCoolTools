(function() {
  'use strict';

  angular.module('kct.services.persistence.saveManager')
    .factory('SaveRef', ['SavesRef', SaveRef])
  ;

  function SaveRef(SavesRef) {
    return function(saveId) {
      return SavesRef.child(saveId);
    };
  }

})();
