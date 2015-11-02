(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.list', [
    'ui.router',
    'firebase',

    'kct.services.persistence.saveManager',
    'kct.directives.kctTable'
  ]);

})();
