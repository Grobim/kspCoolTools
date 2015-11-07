(function() {
  'use strict';

  angular.module('kct.layout.profile')
    .config(['$stateProvider', ProfileRoutes])
  ;

  function ProfileRoutes($stateProvider) {
    $stateProvider.state('kct.profile', {
      url           : '/profile',
      templateUrl   : 'kctMain/layout/profile/profile.tpl.html',
      controller    : 'ProfileController',
      controllerAs  : 'profileCtrl',
      data          : {
        bodyClass      : 'profile',
        windowTitleKey : 'kct.layout.header.profile'
      },
      ncyBreadcrumb : {
        label  : 'kct.layout.header.profile',
        parent : 'kct.home'
      }
    });
  }

})();
