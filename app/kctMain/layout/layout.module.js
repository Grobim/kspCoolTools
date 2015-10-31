(function() {
  'use strict';

  angular.module('kct.layout', [
    'ui.router',

    'kct.common',

    'kct.layout.home',
    'kct.layout.login',
    'kct.layout.profile',
    'kct.layout.saveManager'
  ]);
})();
