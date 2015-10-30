(function() {
  'use strict';

  angular.module('kspCoolTools.layout.home')
    .config(['$stateProvider', HomeRoutes])
  ;

  function HomeRoutes($stateProvider) {

    $stateProvider.state('kspCoolTools.home', {
      url          : '/home',
      templateUrl  : 'saveManager/layout/home/home.tpl.html',
      controller   : 'HomeController',
      controllerAs : 'homeCtrl',
      data         : {
        bodyClass : 'home'
      }
    });

  }

})();
