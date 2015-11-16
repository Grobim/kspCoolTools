(function() {
  'use strict';

  angular.module('kct.layout.profile', [
    'ui.router',
    'pascalprecht.translate',

    'kct.angularFireInterceptor',

    'kct.common',
    'kct.components.persistence',
    'kct.components.ui.directives.smartField',
    'kct.components.ui.toast'
  ]);

})();
