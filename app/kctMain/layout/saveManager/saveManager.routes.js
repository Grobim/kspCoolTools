(function() {
  'use strict';

  angular.module('kct.layout.saveManager')
    .config(['$stateProvider', SaveManagerRoutes])
  ;

  function SaveManagerRoutes($stateProvider) {
    $stateProvider.state('kct.saveManager', {
      url         : '/saveManager',
      abstract    : true,
      templateUrl : 'kctMain/layout/saveManager/saveManager.tpl.html',
      data        : {
        bodyClass      : 'save-manager'
      }
    });
  }

})();
