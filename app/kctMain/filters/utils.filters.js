(function() {
  'use strict';

  angular.module('kct.filters')
    .filter('replaceChars', [ReplaceCharFilter])
  ;

  function ReplaceCharFilter() {
    return function(input, searchValue, newValue) {
      return (input || '').split(searchValue).join(newValue);
    };
  }

})();
