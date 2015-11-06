(function() {
  'use strict';

  angular.module('kct.services.persistence.saveManager')
    .factory('SaveManagerRef', ['KctRootRef', SaveManagerRef])
  ;

  function SaveManagerRef(KctRootRef) {
    return KctRootRef.child('saveManager');
  }

})();
