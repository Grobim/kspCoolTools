(function() {
  'use strict';

  angular.module('kct.configs', [
    'ngCookies',
    'ngSanitize',

    'ui.router',
    'pascalprecht.translate',
    'ncy-angular-breadcrumb',

    'kct.directives.kctTable'
  ]);

})();
