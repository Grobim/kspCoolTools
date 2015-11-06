(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details', [
    'ui.router',
    'firebase',

    'kct.components.persistence.saveManager',
    'kct.components.ui.directives.kctTable',

    'kct.layout.saveManager.mods.details.modVersions'
  ]);

})();
