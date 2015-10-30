(function() {
  'use strict';

  angular.module('kspCoolTools.layout')
    .config(['$stateProvider', '$urlRouterProvider', layoutRoutes])
  ;

  function layoutRoutes($stateProvider, $urlRouterProvider) {

    $stateProvider.state('kspCoolTools', {
      url          : '/kspCoolTools',
      templateUrl  : 'saveManager/layout/layout.tpl.html',
      controller   : 'LayoutController',
      controllerAs : 'layoutCtrl',
      abstract     : true
    });

    $urlRouterProvider.otherwise('/kspCoolTools/home');

  }

})();
