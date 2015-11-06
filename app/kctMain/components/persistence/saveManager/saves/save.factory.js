(function() {
  'use strict';

  angular.module('kct.components.persistence.saveManager')
    .factory('SaveRef', ['SavesRef', SaveRef])
  ;

  function SaveRef(SavesRef) {
    return function(saveId) {
      return SavesRef.child(saveId);
    };
  }

})();
