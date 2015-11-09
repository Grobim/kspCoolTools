(function() {
  'use strict';

  angular.module('kct.layout', [
    'ngAnimate',
    'ngSanitize',
    
    'ui.router',
    'ui.select',
    'pascalprecht.translate',
    'ncy-angular-breadcrumb',

    'kct.common',
    'kct.components.i18n',
    'kct.components.ui.breadCrumb',
    'kct.components.ui.directives.kctFillWindow',
    'kct.components.ui.growl',
    'kct.components.interceptors',

    'kct.layout.home',
    'kct.layout.login',
    'kct.layout.profile',
    'kct.layout.saveManager'
  ]);
})();
