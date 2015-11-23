(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details')
    .config(['$stateProvider', DetailsRoutesConfig])
  ;

  function DetailsRoutesConfig($stateProvider) {

    $stateProvider
      .state('kct.saveManager.mod', {
        url        : '/mods/{modId}',
        abstract   : true,
        template   : '<ui-view />',
        controller : 'ModDetailMainController',
        onExit     : ['breadCrumbModelService', function(breadCrumbModelService) {
          breadCrumbModelService.remove('mod');
        }]
      })
      .state('kct.saveManager.mod.creation', {
        url          : '/create',
        templateUrl  : 'kctMain/layout/saveManager/mods/details/new.tpl.html',
        controller   : 'ModDetailController',
        controllerAs : 'newModCtrl',
        data          : {
          windowTitleKey : 'kct.layout.saveManager.mods.details.creation.header',
          requireAuth    : true
        },
        ncyBreadcrumb : {
          translate : 'kct.layout.saveManager.mods.details.creation.header',
          parent    : 'kct.saveManager.mods'
        }
      })
      .state('kct.saveManager.mod.details', {
        url          : '/edit',
        templateUrl  : 'kctMain/layout/saveManager/mods/details/details.tpl.html',
        controller   : 'ModDetailController',
        controllerAs : 'modDetailsCtrl',
        data          : {
          windowTitleKey    : 'kct.layout.saveManager.mods.details.edition.title'
        },
        ncyBreadcrumb : {
          translate       : 'kct.layout.saveManager.mods.details.edition.header',
          translateValues : '{modTitle : bcModel.mod.title || \'\'}',
          parent          : 'kct.saveManager.mods'
        }
      })
    ;
  }

})();
