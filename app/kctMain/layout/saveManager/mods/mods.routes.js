(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods')
    .config(['$stateProvider', ModsRoutes])
  ;

  function ModsRoutes($stateProvider) {
    $stateProvider.state('kct.saveManager.mods', {
      url          : '/mods',
      templateUrl  : 'kctMain/layout/saveManager/mods/list/list.tpl.html',
      controller   : 'ModsController',
      controllerAs : 'modsCtrl'
    });
  }

})();
