(function() {
  'use strict';

  angular.module('kct.components.filters')
    .filter('replaceChars', [ReplaceCharFilter])
    .filter('length', [LengthFilter])
    .filter('omitFromField', [OmitFromFieldFilter])
  ;

  function ReplaceCharFilter() {
    return function(input, searchValue, newValue) {
      return (input || '').split(searchValue).join(newValue);
    };
  }

  function LengthFilter() {
    return function(input) {
      return _.size(input);
    };
  }

  function OmitFromFieldFilter() {
    return function(inputList, filtered, filteredField) {
      return _.reject(inputList, function(inputListItem) {
        if (_.isArray(filtered)) {
          return _.find(filtered, filteredField, _.get(inputListItem, filteredField));
        } else {
          return _.get(filtered, filteredField) === _.get(inputListItem, filteredField);
        }
      });
    };
  }

})();
