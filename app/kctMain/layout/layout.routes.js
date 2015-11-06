(function() {
  'use strict';

  angular.module('kct.layout')
    .config([
      '$stateProvider',
      '$urlRouterProvider',
      '$translateProvider',
      'i18nDefaultFallBackLanguage',
      LayoutRoutes
    ])
  ;

  function LayoutRoutes(
    $stateProvider,
    $urlRouterProvider,
    $translateProvider,
    i18nDefaultFallBackLanguage
  ) {

    $stateProvider.state('kct', {
      url           : '/kct/:langKey',
      templateUrl   : 'kctMain/layout/layout.tpl.html',
      controller    : 'LayoutController',
      controllerAs  : 'layoutCtrl',
      abstract      : true
    });

    $urlRouterProvider.otherwise(
      '/kct/' +
      ($translateProvider.preferredLanguage() || i18nDefaultFallBackLanguage) +
      '/home'
    );

  }

})();
