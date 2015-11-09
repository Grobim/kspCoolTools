(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details.modVersions.list', [
    'ui.router',
    'firebase',
    'pascalprecht.translate',

    'kct.constants',
    'kct.angularFireInterceptor',
    'kct.components.persistence.saveManager',
    'kct.components.ui.directives.kctTable',
    'kct.components.filters'
  ]);

})();
