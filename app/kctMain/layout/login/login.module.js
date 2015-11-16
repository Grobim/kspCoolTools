(function() {
  'use strict';

  angular.module('kct.layout.login', [
    'ui.router',
    'pascalprecht.translate',

    'kct.angularFireInterceptor',

    'kct.components.ui.toast',
    'kct.profiles'
  ]);

})();
