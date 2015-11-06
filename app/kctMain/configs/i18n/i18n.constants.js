(function() {
  'use strict';

  angular.module('kct.configs')
    .constant('i18nAvailableLangs', [
      'en',
      'fr'
    ])
    .constant('i18nRelatedLangMap', {
      en : 'en_*',
      fr : 'fr_*'
    })
    .constant('i18nFlagMap', {
      en : 'gb'
    })
  ;

})();
