(function() {
  'use strict';

  angular.module('kct.services.i18n')
    .service('i18nService', ['i18nAvailableLangs', 'i18nFlagMap', I18nService])
  ;

  function I18nService(i18nAvailableLangs, i18nFlagMap) {
    return {
      getLangList : getLangList
    };

    function getLangList() {
      var langList = [];

      _.forEach(i18nAvailableLangs, function(value) {
        var langObj = {};

        langObj.lang = value;
        langObj.flag = i18nFlagMap[value] || value;

        langList.push(langObj);
      });

      return langList;
    }

  }

})();
