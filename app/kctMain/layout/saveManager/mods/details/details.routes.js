(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details')
    .config(['$stateProvider', 'creationKey', DetailsRoutesConfig])
  ;

  function DetailsRoutesConfig($stateProvider, creationKey) {

    $stateProvider
      .state('kct.saveManager.modCreation', {
        url          : '/mods/{modId:(?:' + creationKey + ')}',
        templateUrl  : 'kctMain/layout/saveManager/mods/details/new.tpl.html',
        controller   : 'ModDetailController',
        controllerAs : 'newModCtrl',
        data          : {
          windowTitleKey : 'kct.layout.saveManager.mods.details.creation.header'
        },
        ncyBreadcrumb : {
          translate : 'kct.layout.saveManager.mods.details.creation.header',
          parent    : 'kct.saveManager.mods'
        }
      })
      .state('kct.saveManager.modDetail', {
        url          : '/mods/{modId}',
        templateUrl  : 'kctMain/layout/saveManager/mods/details/details.tpl.html',
        controller   : 'ModDetailController',
        controllerAs : 'modDetailsCtrl',
        data          : {
          windowTitleKey    : 'kct.layout.saveManager.mods.details.edition.header'
        },
        ncyBreadcrumb : {
          translate       : 'kct.layout.saveManager.mods.details.edition.header',
          translateValues : '{modTitle : modDetailsCtrl.mod.title || \'\'}',
          parent          : 'kct.saveManager.mods'
        }
      })
    ;
  }

})();
