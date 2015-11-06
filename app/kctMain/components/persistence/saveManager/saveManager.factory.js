(function() {
  'use strict';

  angular.module('kct.components.persistence.saveManager')
    .factory('SaveManagerRef', ['KctRootRef', SaveManagerRef])
  ;

  function SaveManagerRef(KctRootRef) {
    return KctRootRef.child('saveManager');
  }

})();
