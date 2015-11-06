(function() {
  'use strict';

  angular.module('kct.components.persistence.saveManager')
    .factory('SavesRef', ['SaveManagerRef', SavesRefFactory])
  ;

  function SavesRefFactory(SaveManagerRef) {
    return function() {
      return SaveManagerRef.child('saves');
    };
  }

})();
