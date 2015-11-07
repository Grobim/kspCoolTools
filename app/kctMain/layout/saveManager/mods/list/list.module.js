(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.list', [
    'ui.router',
    'firebase',
    'pascalprecht.translate',

    'kct.constants',
    'kct.components.persistence.saveManager',
    'kct.components.ui.directives.kctTable'
  ]);

})();
