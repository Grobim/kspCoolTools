(function() {
  'use strict';

  angular.module('kct.layout.profile', [
    'ngMessages',

    'ui.router',
    'pascalprecht.translate',
    'angular-growl',

    'kct.angularFireInterceptor',

    'kct.common',
    'kct.components.persistence',
    'kct.components.ui.directives.smartField'
  ]);

})();
