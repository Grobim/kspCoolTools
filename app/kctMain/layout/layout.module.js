(function() {
  'use strict';

  angular.module('kct.layout', [
    'ngAnimate',
    'ngSanitize',
    
    'ui.router',
    'ui.select',
    'pascalprecht.translate',

    'kct.common',
    'kct.configs',
    'kct.services.i18n',

    'kct.layout.home',
    'kct.layout.login',
    'kct.layout.profile',
    'kct.layout.saveManager'
  ]);
})();
