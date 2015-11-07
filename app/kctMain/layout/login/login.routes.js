(function() {
  'use strict';

  angular.module('kct.layout.login')
    .config(['$stateProvider', LoginConfig])
  ;

  function LoginConfig($stateProvider) {
    $stateProvider.state('kct.login', {
      url          : '/login',
      templateUrl  : 'kctMain/layout/login/login.tpl.html',
      controller   : 'LoginController',
      controllerAs : 'loginCtrl',
      data         : {
        bodyClass  : 'login',
        windowTitleKey : 'kct.layout.header.login'
      },
      ncyBreadcrumb : {
        translate : 'kct.layout.header.login',
        parent    : 'kct.home'
      }
    });
  }

})();
