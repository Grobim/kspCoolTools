(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details.modVersions.details', [
    'ui.router',
    'pascalprecht.translate',
    'ngMaterial',
    'md.data.table',

    'kct.angularFireInterceptor',
    'kct.constants',
    'kct.components.filters',
    'kct.components.ui.directives.smartField',
    'kct.components.persistence.saveManager',
    'kct.components.ui.mdDataTableUtils',
    'kct.components.ui.breadCrumb',
    'kct.components.filters',

    'kct.layout.saveManager.mods.details.modVersions.details.modVersionDeps'
  ]);

})();
