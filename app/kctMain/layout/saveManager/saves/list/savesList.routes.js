(function() {
  'use strict';

  angular.module('kct.layout.saveManager.saves.list')
    .config(['$stateProvider', SavesRoutes])
  ;

  function SavesRoutes($stateProvider) {
    $stateProvider.state('kct.saveManager.saves', {
      url           : '/saves',
      templateUrl   : 'kctMain/layout/saveManager/saves/list/savesList.tpl.html',
      controller    : 'SavesController',
      controllerAs  : 'savesCtrl',
      data          : {
        windowTitleKey : 'kct.layout.saveManager.saves.list.windowTitle'
      },
      ncyBreadcrumb : {
        translate : 'kct.layout.saveManager.saves.list.breadCrumbTitle'
      }
    });
  }

})();
