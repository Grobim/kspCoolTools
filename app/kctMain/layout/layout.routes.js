(function() {
  'use strict';

  angular.module('kct.layout')
    .config(['$stateProvider', '$urlRouterProvider', LayoutRoutes])
  ;

  function LayoutRoutes($stateProvider, $urlRouterProvider) {

    $stateProvider.state('kct', {
      url          : '/kct',
      templateUrl  : 'kctMain/layout/layout.tpl.html',
      controller   : 'LayoutController',
      controllerAs : 'layoutCtrl',
      abstract     : true
    });

    $urlRouterProvider.otherwise('/kct/home');

  }

})();
