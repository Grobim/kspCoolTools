(function() {
  'use strict';

  angular.module('kct.layout', [
    'ngAnimate',
    
    'ui.router',
    'pascalprecht.translate',

    'kct.common',

    'kct.layout.home',
    'kct.layout.login',
    'kct.layout.profile',
    'kct.layout.saveManager'
  ]);
})();
