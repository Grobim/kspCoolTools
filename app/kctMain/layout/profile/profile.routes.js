(function() {
  'use strict';

  angular.module('kct.layout.profile')
    .config(['$stateProvider', ProfileRoutes])
  ;

  function ProfileRoutes($stateProvider) {
    $stateProvider.state('kct.profile', {
      url : '/profile',
      templateUrl : 'kctMain/layout/profile/profile.tpl.html',
      controller : 'ProfileController',
      controllerAs : 'profileCtrl',
      data : {
        bodyClass : 'profile'
      }
    });
  }

})();
