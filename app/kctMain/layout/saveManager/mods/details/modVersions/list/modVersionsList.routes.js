(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details.modVersions')
    .config(['$stateProvider', ModVersionsConfig])
  ;

  function ModVersionsConfig($stateProvider) {
    $stateProvider
      .state('kct.saveManager.modVersions', {
        url          : '/mods/:modId/modVersions',
        templateUrl  : 'kctMain/layout/saveManager/mods/details/modVersions/list/modVersionsList.tpl.html',
        controller   : 'ModDetailsModVersionsListController',
        controllerAs : 'modVersionsListCtrl'
      })
    ;
  }

})();
