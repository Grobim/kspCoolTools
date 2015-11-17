(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details.modVersions.list', [
    'ui.router',
    'pascalprecht.translate',
    'ngMaterial',
    'md.data.table',

    'kct.angularFireInterceptor',
    'kct.constants',
    'kct.components.persistence.saveManager',
    'kct.components.ui.directives.kctTable',
    'kct.components.ui.mdDataTableUtils',
    'kct.components.filters'
  ]);

})();
