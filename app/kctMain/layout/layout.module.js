(function() {
  'use strict';

  angular.module('kct.layout', [
    'ngAnimate',
    'ngSanitize',
    
    'ui.router',
    'ui.select',
    'pascalprecht.translate',

    'kct.common',

    'kct.layout.home',
    'kct.layout.login',
    'kct.layout.profile',
    'kct.layout.saveManager'
  ]);
})();
