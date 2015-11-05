(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details.modVersions.list', [
    'ui.router',
    'firebase',
    'pascalprecht.translate',

    'kct.services.persistence.saveManager',
    'kct.directives.kctTable',
    'kct.filters'
  ]);

})();
