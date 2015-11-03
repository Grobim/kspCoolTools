(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details.modVersions.details')
    .config(['$stateProvider', ModVersionsDetailsRoutes])
  ;

  function ModVersionsDetailsRoutes($stateProvider) {
    $stateProvider
      .state('kct.saveManager.modVersionDetails', {
        url          : '/mods/:modId/versions/:modVersionId',
        templateUrl  : 'kctMain/layout/saveManager/mods/details/modVersions/details/modVersionsDetails.tpl.html',
        controller   : 'ModDetailsModVersionsDetailsController',
        controllerAs : 'modVersionsDetailsCtrl'
      })
    ;
  }

})();
