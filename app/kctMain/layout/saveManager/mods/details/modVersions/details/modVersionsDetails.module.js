(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details.modVersions.details', [
    'ui.router',
    'firebase',
    'pascalprecht.translate',

    'kct.filters',
    'kct.services.persistence.saveManager',

    'kct.layout.saveManager.mods.details.modVersions.details.modVersionDeps'
  ]);

})();
