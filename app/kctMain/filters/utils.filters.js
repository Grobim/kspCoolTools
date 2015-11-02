(function() {
  'use strict';

  angular.module('kct.filters')
    .filter('replaceChars', [ReplaceCharFilter])
    .filter('length', [LengthFilter])
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

})();
