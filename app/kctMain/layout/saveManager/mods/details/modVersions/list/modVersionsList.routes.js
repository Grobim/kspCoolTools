(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details.modVersions')
    .config(['$stateProvider', ModVersionsConfig])
  ;

  function ModVersionsConfig($stateProvider) {
    $stateProvider
      .state('kct.saveManager.modVersions', {
        url          : '/mods/:modId/versions',
        templateUrl  : 'kctMain/layout/saveManager/mods/details/modVersions/list/modVersionsList.tpl.html',
        controller   : 'ModDetailsModVersionsListController',
        controllerAs : 'modVersionsListCtrl',
        data          : {
          windowTitleKey    : 'kct.layout.saveManager.mods.details.modVersions.list.title'
        },
        ncyBreadcrumb : {
          translate       : 'kct.layout.saveManager.mods.details.modVersions.list.title',
          parent          : 'kct.saveManager.modDetail'
        }
      })
    ;
  }

})();
