(function() {
  'use strict';

  angular.module('kct.layout.saveManager.saves')
    .config(['$stateProvider', SavesRoutes])
  ;

  function SavesRoutes($stateProvider) {
    $stateProvider.state('kct.saveManager.saves', {
      url          : '/saves',
      templateUrl  : 'kctMain/layout/saveManager/saves/saves.tpl.html',
      controller   : 'SavesController',
      controllerAs : 'savesCtrl'
    });
  }

})();
