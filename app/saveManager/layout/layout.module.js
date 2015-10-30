(function() {
  'use strict';

  angular.module('kspCoolTools.layout', [
    'ui.router',

    'kspToolsBase',

    'kspCoolTools.layout.home',
    'kspCoolTools.layout.login',
    'kspCoolTools.layout.profile'
  ]);
})();
