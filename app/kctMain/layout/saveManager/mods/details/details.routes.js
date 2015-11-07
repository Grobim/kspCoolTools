(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details')
    .config(['$stateProvider', DetailsRoutesConfig])
  ;

  function DetailsRoutesConfig($stateProvider) {

    $stateProvider
      .state('kct.saveManager.modCreation', {
        url          : '/mods/{modId:(?:new)}',
        templateUrl  : 'kctMain/layout/saveManager/mods/details/new.tpl.html',
        controller   : 'ModDetailController',
        controllerAs : 'newModCtrl',
        data          : {
          windowTitleKey : 'kct.layout.saveManager.mods.details'
        },
        ncyBreadcrumb : {
          label                : 'kct.layout.saveManager.mods.details.creation.header',
          parent               : 'kct.saveManager.mods'
        }
      })
      .state('kct.saveManager.modDetail', {
        url          : '/mods/{modId}',
        templateUrl  : 'kctMain/layout/saveManager/mods/details/details.tpl.html',
        controller   : 'ModDetailController',
        controllerAs : 'modDetailsCtrl',
        data          : {
          windowTitleKey : 'kct.layout.saveManager.mods.details'
        },
        ncyBreadcrumb : {
          label                : 'kct.layout.saveManager.mods.details.edition.header',
          labelTranslateValues : '{modTitle : modDetailsCtrl.mod.title}',
          parent               : 'kct.saveManager.mods'
        }
      })
    ;
  }

})();
