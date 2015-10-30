(function() {
  'use strict';

  angular.module('kct')
    .run(['$rootScope', '$state', '$stateParams', stateRun])
  ;

  function stateRun($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }

})();
