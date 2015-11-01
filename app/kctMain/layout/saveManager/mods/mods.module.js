(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods', [
    'ui.router',
    'ui.bootstrap',
    'firebase',

    'kct.services.persistence.saveManager',
    'kct.directives.kctTable'
  ]);
})();
