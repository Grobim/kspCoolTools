(function() {
  'use strict';

  angular.module('kct.configs')
    .config([
      '$translateProvider',
      'i18nAvailableLangs',
      'i18nAliasesLangMap',
      I18nConfig
    ])
  ;

  function I18nConfig(
    $translateProvider,
    i18nAvailableLangs,
    i18nAliasesLangMap
  ) {
    var langKeys = _.keys(i18nAliasesLangMap),
        availableLangMap = {},
        fallbackLanguage;

    _.forOwn(i18nAliasesLangMap, function(value, key) {
      if (_.isArray(value)) {
        _.forEach(value, function(subValue) {
          availableLangMap[subValue] = key;
        });
      } else {
        availableLangMap[value] = key;
      }
    });

    $translateProvider
      .registerAvailableLanguageKeys(langKeys, availableLangMap)
      .determinePreferredLanguage();

    // if preferred language is valid (doesn't contains '_' and is a langKey)
    if ($translateProvider.preferredLanguage().indexOf('_') === -1 &&
        langKeys.indexOf($translateProvider.preferredLanguage()) > -1) {
      fallbackLanguage = $translateProvider.preferredLanguage();
    }

    $translateProvider
      .preferredLanguage(fallbackLanguage || 'en')
      .fallbackLanguage(fallbackLanguage || 'en')
      .useMessageFormatInterpolation()
      .useCookieStorage()
      .useSanitizeValueStrategy('escape')
      .useStaticFilesLoader({
        prefix: 'langs/locale-',
        suffix: '.json'
      });
  }

})();
