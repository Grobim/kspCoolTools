(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details.modVersions.details', [
    'ui.router',
    'firebase',
    'pascalprecht.translate',

    'kct.constants',
    'kct.components.filters',
    'kct.components.persistence.saveManager',
    'kct.components.ui.breadCrumb',

    'kct.layout.saveManager.mods.details.modVersions.details.modVersionDeps'
  ]);

})();
