(function() {
  'use strict';

  angular.module('kct.filters')
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
    return function(inputList, otherList, field) {
      return _.reject(inputList, function(inputListItem) {
        return _.find(otherList, field, _.get(inputListItem, field));
      });
    };
  }

})();
