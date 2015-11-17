(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details', [
    'ui.router',
    'pascalprecht.translate',
    'ngMaterial',
    'md.data.table',

    'kct.constants',
    'kct.angularFireInterceptor',
    'kct.components.persistence.saveManager',
    'kct.components.ui.directives.smartField',
    'kct.components.ui.mdDataTableUtils',
    'kct.components.ui.breadCrumb',
    'kct.components.filters',

    'kct.layout.saveManager.mods.details.modVersions'
  ]);

})();
