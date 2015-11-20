(function() {
  'use strict';

  angular.module('kct.layout.saveManager.saves.list', [
    'ui.router',
    'pascalprecht.translate',

    'kct.angularFireInterceptor',

    'kct.constants',
    'kct.components.persistence.saveManager',
    'kct.components.ui.mdDataTableUtils'
  ]);

})();
