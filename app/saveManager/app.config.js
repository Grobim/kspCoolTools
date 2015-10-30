(function() {
  'use strict';

  angular.module('kspCoolTools')
    .run(['$rootScope', '$state', '$stateParams', stateRun])
  ;

  function stateRun($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }

})();
