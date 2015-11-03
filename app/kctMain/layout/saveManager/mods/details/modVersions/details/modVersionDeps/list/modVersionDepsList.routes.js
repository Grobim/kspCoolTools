(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details.modVersions.details.modVersionDeps.list')
    .config(['$stateProvider', DepsListRoutes])
  ;

  function DepsListRoutes($stateProvider) {
    $stateProvider
      .state('kct.saveManager.modVersionDepsList', {
        url          : '/mods/:modId/versions/:modVersionId/deps',
        templateUrl  : 'kctMain/layout/saveManager/mods/details/modVersions/details/modVersionDeps/list/modVersionDepsList.tpl.html',
        controller   : 'ModDetailsModVersionDepListController',
        controllerAs : 'depsListCtrl'
      })
    ;
  }

})();
