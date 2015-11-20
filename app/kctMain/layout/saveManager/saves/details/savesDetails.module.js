(function() {
  'use strict';

  angular.module('kct.layout.saveManager.saves.details', [
    'ui.router',
    'pascalprecht.translate',
    'ngMaterial',
    'ngFileUpload',

    'kct.constants',
    'kct.angularFireInterceptor',
    'kct.components.persistence.saveManager'
  ]);

})();
