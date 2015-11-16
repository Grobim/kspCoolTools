(function() {
  'use strict';

  angular.module('kct.layout.saveManager')
    .config(['$stateProvider', SaveManagerRoutes])
  ;

  function SaveManagerRoutes($stateProvider) {
    $stateProvider.state('kct.saveManager', {
      url      : '/saveManager',
      abstract : true,
      template : '<ui-view />',
      data     : {
        bodyClass      : 'save-manager',
        titleKey       : 'kct.layout.saveManager.header'
      }
    });
  }

})();
