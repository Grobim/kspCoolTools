(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details.modVersions.details')
    .config(['$stateProvider', ModVersionsDetailsRoutes])
  ;

  function ModVersionsDetailsRoutes($stateProvider) {
    $stateProvider
      .state('kct.saveManager.mod.version', {
        url      : '/versions/{modVersionId}',
        abstract : true,
        template : '<ui-view />',
        controller : 'ModDetailsModVersionsDetailsMainController',
        onExit     : [
          'breadCrumbModelService',
          function(breadCrumbModelService) {
            breadCrumbModelService.remove('modVersion');
          }
        ]
      })
      .state('kct.saveManager.mod.version.create', {
        url           : '/create',
        templateUrl   : 'kctMain/layout/saveManager/mods/details/modVersions/details/modVersionsDetails.tpl.html',
        controller    : 'ModDetailsModVersionsDetailsController',
        controllerAs  : 'modVersionsDetailsCtrl',
        data          : {
          windowTitleKey : 'kct.layout.saveManager.mods.details.modVersions.details.create.header'
        },
        ncyBreadcrumb : {
          translate : 'kct.layout.saveManager.mods.details.modVersions.details.create.header',
          parent    : 'kct.saveManager.mod.versions'
        }
      })
      .state('kct.saveManager.mod.version.details', {
        url           : '/details',
        templateUrl   : 'kctMain/layout/saveManager/mods/details/modVersions/details/modVersionsDetails.tpl.html',
        controller    : 'ModDetailsModVersionsDetailsController',
        controllerAs  : 'modVersionsDetailsCtrl',
        data          : {
          windowTitleKey : 'kct.layout.saveManager.mods.details.modVersions.details.edit.windowTitle'
        },
        ncyBreadcrumb : {
          translate       : 'kct.layout.saveManager.mods.details.modVersions.details.edit.title',
          translateValues : '{modVersion : bcModel.modVersion.getId() || \'\'}',
          parent          : 'kct.saveManager.mod.versions'
        }
      })
    ;
  }

})();
