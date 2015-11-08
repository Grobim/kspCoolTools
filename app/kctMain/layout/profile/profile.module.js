(function() {
  'use strict';

  angular.module('kct.layout.profile', [
    'ngMessages',

    'ui.router',
    'kct.angularFireInterceptor',
    'kct.components.persistence',
    'pascalprecht.translate',

    'kct.common',
    'kct.components.ui.directives.smartField'
  ]);

})();
