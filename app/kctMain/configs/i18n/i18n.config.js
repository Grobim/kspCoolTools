(function() {
  'use strict';

  angular.module('kct.configs')
    .config(['$translateProvider', I18nConfig])
  ;

  function I18nConfig($translateProvider) {
    $translateProvider
      .fallbackLanguage('en')
      .determinePreferredLanguage()
      .useCookieStorage()
      .registerAvailableLanguageKeys(['en', 'fr'], {
        'en_*': 'en',
        'fr_*': 'fr'
      })
      .useSanitizeValueStrategy('escape')
      .useStaticFilesLoader({
        prefix: 'langs/locale-',
        suffix: '.json'
      });
  }

})();
