(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.list', [
    'ui.router',
    'pascalprecht.translate',

    'kct.angularFireInterceptor',
    'kct.constants',
    'kct.components.persistence.saveManager',
    'kct.components.ui.directives.kctTable'
  ]);

})();
