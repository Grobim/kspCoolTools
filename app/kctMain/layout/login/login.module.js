(function() {
  'use strict';

  angular.module('kct.layout.login', [
    'ui.router',
    'pascalprecht.translate',
    'ngMaterial',

    'kct.angularFireInterceptor',

    'kct.components.ui.toast',
    'kct.profiles'
  ]);

})();
