(function() {
  'use strict';

  angular.module('kct.directives.kctTable')
    .directive('kctTableImplicit', [KctTableImplicitDirective])
  ;

  function KctTableImplicitDirective() {
    return {
      restrict : 'A',
      compile  : compile
    };

    function compile(element) {
      var attribute = element.attr('kct-table-attribute');
      if (!attribute) {
        throw 'at-implicit specified without at-attribute: ' + (element.html());
      }
      return element.append('<span ng-bind=\'item.' + attribute + '\'></span>');
    }
  }

})();
