(function() {
  'use strict';

  angular.module('kct.layout.profile', [
    'ui.router',
    'pascalprecht.translate',
    'ngMaterial',

    'kct.angularFireInterceptor',

    'kct.common',
    'kct.components.persistence',
    'kct.components.ui.directives.smartField',
    'kct.components.ui.toast'
  ]);

})();
