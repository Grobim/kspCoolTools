(function() {
  'use strict';

  angular.module('kspCoolTools.layout.login')
    .config(['$stateProvider', LoginConfig])
  ;

  function LoginConfig($stateProvider) {
    $stateProvider.state('kspCoolTools.login', {
      url          : '/login',
      templateUrl  : 'saveManager/layout/login/login.tpl.html',
      controller   : 'LoginController',
      controllerAs : 'loginCtrl',
      data         : {
        bodyClass  : 'login'
      }
    });
  }

})();
