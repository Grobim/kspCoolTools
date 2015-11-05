(function() {
  'use strict';

  angular.module('kct.services.persistence.saveManager')
    .factory('SaveInclModsRef', ['SaveManagerRef', SaveInclModsRefFactory])
  ;

  function SaveInclModsRefFactory(SaveManagerRef) {
    return function(saveId) {
      return SaveManagerRef.child('saveInclMods').child(saveId);
    };
  }

})();
