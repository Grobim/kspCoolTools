(function() {
  'use strict';

  angular.module('kspCoolTools')
    .config(['$stateProvider', '$urlRouterProvider', kspCoolToolsRoutes]);

  function kspCoolToolsRoutes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/kspCoolTools');
  }
})();
