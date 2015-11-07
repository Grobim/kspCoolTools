(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details.modVersions.details.modVersionDeps.list')
    .config(['$stateProvider', DepsListRoutes])
  ;

  function DepsListRoutes($stateProvider) {
    $stateProvider
      .state('kct.saveManager.mod.version.deps', {
        url           : '/deps',
        templateUrl   : 'kctMain/layout/saveManager/mods/details/modVersions/details/modVersionDeps/list/modVersionDepsList.tpl.html',
        controller    : 'ModDetailsModVersionDepListController',
        controllerAs  : 'depsListCtrl',
        data          : {
          windowTitleKey : 'kct.layout.saveManager.mods.details.modVersions.details.modVersionDeps.list.title'
        },
        ncyBreadcrumb : {
          translate : 'kct.layout.saveManager.mods.details.modVersions.details.modVersionDeps.list.title',
          parent    : 'kct.saveManager.mod.version.details'
        }
      })
    ;
  }

})();
