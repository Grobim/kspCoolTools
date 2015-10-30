(function() {
  'use strict';

  angular.module('kspCoolTools.layout')
    .config(['$stateProvider', layoutRoutes])
    ;

  function layoutRoutes($stateProvider) {

    $stateProvider.state('kspCoolTools', {
      url          : '/kspCoolTools',
      templateUrl  : 'saveManager/layout/layout.tpl.html',
      controller   : 'LayoutController',
      controllerAs : 'layoutCtrl'
    });

  }
})();
