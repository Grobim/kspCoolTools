(function() {
  'use strict';

  angular.module('kct.layout.home')
    .config(['$stateProvider', HomeRoutes])
  ;

  function HomeRoutes($stateProvider) {

    $stateProvider.state('kct.home', {
      url          : '/home',
      templateUrl  : 'kctMain/layout/home/home.tpl.html',
      controller   : 'HomeController',
      controllerAs : 'homeCtrl',
      data         : {
        bodyClass : 'home'
      }
    });

  }

})();
