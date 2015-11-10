(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details.modVersions.details', [
    'ui.router',
    'pascalprecht.translate',

    'kct.angularFireInterceptor',
    'kct.constants',
    'kct.components.filters',
    'kct.components.persistence.saveManager',
    'kct.components.ui.breadCrumb',

    'kct.layout.saveManager.mods.details.modVersions.details.modVersionDeps'
  ]);

})();
