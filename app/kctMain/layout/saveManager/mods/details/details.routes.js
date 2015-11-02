(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details')
    .config(['$stateProvider', DetailsRoutesConfig])
  ;

  function DetailsRoutesConfig($stateProvider) {
    $stateProvider
      .state('kct.saveManager.modDetail', {
        url          : '/mods/:modId',
        templateUrl  : 'kctMain/layout/saveManager/mods/details/details.tpl.html',
        controller   : 'ModDetailController',
        controllerAs : 'modDetailsCtrl'
      })
    ;
  }

})();
