(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details.modVersions.details.modVersionDeps.list', [
    'ui.router',
    'pascalprecht.translate',
    'ngMaterial',
    'md.data.table',
    'mdColors',

    'kct.angularFireInterceptor',
    'kct.components.filters',
    'kct.components.ui.directives.smartField',
    'kct.components.ui.mdDataTableUtils',
    'kct.components.persistence.saveManager'
  ]);

})();
