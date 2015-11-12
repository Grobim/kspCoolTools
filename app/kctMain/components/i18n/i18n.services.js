(function() {
  'use strict';

  angular.module('kct.components.i18n')
    .service('i18nService', ['i18nAvailableLangs', '$translate', 'i18nFlagMap', I18nService])
  ;

  function I18nService(i18nAvailableLangs, $translate, i18nFlagMap) {
    return {
      getLangList     : getLangList,
      addTranslations : addTranslations,
      isValidLangKey  : isValidLangKey
    };

    function getLangList() {
      var langList = [];

      _.forEach(i18nAvailableLangs, function(value) {
        var langObj = {};

        langObj.lang = value;
        langObj.flag = i18nFlagMap[value] || value;

        langList.push(langObj);
      });

      return addTranslations(langList);
    }

    function addTranslations(langList) {
      _.forEach(langList, function(lang) {
        $translate('kct.layout.languages.' + lang.lang).then(function(translation) {
          lang.translation = translation;
        });
      });
      return langList;
    }

    function isValidLangKey(langKey) {
      return i18nAvailableLangs.indexOf(langKey) > -1;
    }

  }

})();
