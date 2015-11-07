(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.list')
    .config(['$stateProvider', ListRoutesConfig])
  ;

  function ListRoutesConfig($stateProvider) {
    $stateProvider.state('kct.saveManager.mods', {
      url           : '/mods',
      templateUrl   : 'kctMain/layout/saveManager/mods/list/list.tpl.html',
      controller    : 'ModsController',
      controllerAs  : 'modsCtrl',
      data          : {
        windowTitleKey : 'kct.layout.header.saveManager.mods'
      },
      ncyBreadcrumb : {
        translate : 'kct.layout.header.saveManager.mods',
        parent    : 'kct.home'
      }
    });
  }

})();
