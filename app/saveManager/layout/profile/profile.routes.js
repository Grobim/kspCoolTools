(function() {
  'use strict';

  angular.module('kspCoolTools.layout.profile')
    .config(['$stateProvider', ProfileRoutes])
  ;

  function ProfileRoutes($stateProvider) {
    $stateProvider.state('kspCoolTools.profile', {
      url : '/profile',
      templateUrl : 'saveManager/layout/profile/profile.tpl.html',
      controller : 'ProfileController',
      controllerAs : 'profileCtrl',
      data : {
        bodyClass : 'profile'
      }
    });
  }

})();
