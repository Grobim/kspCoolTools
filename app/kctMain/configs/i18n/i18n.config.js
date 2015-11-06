(function() {
  'use strict';

  angular.module('kct.configs')
    .config(['$translateProvider', 'i18nRelatedLangMap', I18nConfig])
  ;

  function I18nConfig($translateProvider, i18nRelatedLangMap) {
    var langKeys = _.keys(i18nRelatedLangMap),
        availableLangMap = {};

    _.forOwn(i18nRelatedLangMap, function(value, key) {
      if (_.isArray(value)) {
        _.forEach(value, function(subValue) {
          availableLangMap[subValue] = key;
        });
      } else {
        availableLangMap[value] = key;
      }
    });

    $translateProvider
      .fallbackLanguage('en')
      .useMessageFormatInterpolation()
      .determinePreferredLanguage()
      .useCookieStorage()
      .registerAvailableLanguageKeys(langKeys, availableLangMap)
      .useSanitizeValueStrategy('escape')
      .useStaticFilesLoader({
        prefix: 'langs/locale-',
        suffix: '.json'
      });
  }

})();
