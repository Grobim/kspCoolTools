(function() {
  'use strict';

  angular.module('kct.components.persistence.saveManager')
    .factory('SavesRef', ['SaveManagerRef', SavesRefFactory])
  ;

  function SavesRefFactory(SaveManagerRef) {
    return SaveManagerRef.child('saves');
  }

})();
