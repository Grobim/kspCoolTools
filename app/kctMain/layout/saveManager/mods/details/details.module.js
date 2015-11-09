(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details', [
    'ui.router',
    'firebase',

    'kct.constants',
    'kct.angularFireInterceptor',
    'kct.components.persistence.saveManager',
    'kct.components.ui.directives.kctTable',
    'kct.components.ui.breadCrumb',
    'kct.components.filters',

    'kct.layout.saveManager.mods.details.modVersions'
  ]);

})();
