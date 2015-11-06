(function() {
  'use strict';

  angular.module('kct.components.i18n')
    .constant('i18nDefaultFallBackLanguage', 'en')
    .constant('i18nAvailableLangs', [
      'en',
      'fr'
    ])
    .constant('i18nAliasesLangMap', {
      en : 'en_*',
      fr : 'fr_*'
    })
    .constant('i18nFlagMap', {
      en : 'gb'
    })
  ;

})();
