(function() {
  'use strict';

  angular.module('kct.layout.saveManager.saves.details')
    .config(['$stateProvider', SavesDetailsRoutes])
  ;

  function SavesDetailsRoutes($stateProvider) {

    $stateProvider
      .state('kct.saveManager.save', {
        url        : '/saves/{saveId}',
        abstract   : true,
        template   : '<ui-view />',
        controller : 'SavesDetailsMainController',
        onExit     : ['breadCrumbModelService', function(breadCrumbModelService) {
          breadCrumbModelService.remove('save');
        }]
      })
      .state('kct.saveManager.save.details', {
        url          : '/edit',
        templateUrl  : 'kctMain/layout/saveManager/saves/details/savesDetails.tpl.html',
        controller   : 'SaveDetailsController',
        controllerAs : 'saveDetailsCtrl',
        data          : {
          windowTitleKey    : 'kct.layout.saveManager.saves.details.edition.windowTitle'
        },
        ncyBreadcrumb : {
          translate       : 'kct.layout.saveManager.saves.details.edition.breadCrumbTitle',
          translateValues : '{saveTitle : bcModel.save.title || \'\'}',
          parent          : 'kct.saveManager.saves'
        }
      })
    ;

  }

})();
