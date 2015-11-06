(function() {
  'use strict';

  angular.module('kct.configs')
    .config(['$breadcrumbProvider', BreadCrumbConfig])
  ;

  function BreadCrumbConfig($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
      prefixStateName: 'kct.home'
    });
  }

})();
