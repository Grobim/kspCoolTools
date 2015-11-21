(function() {
  'use strict';

  angular.module('kct.components.ui.directives.loadingSpinner')
    .directive('loadingSpinner', ['LoadingSpinner', LoadingSpinnerDirective])
  ;

  function LoadingSpinnerDirective(LoadingSpinner) {

    return {
      restrict : 'A',
      compile  : compileFnc,
      link     : linkFnc,
      scope    : true
    };

    function compileFnc($element, $attrs) {
      $element.prepend([
        '<div id="' + $attrs.loadingSpinner + 'Spinner" ng-if="loading()">',
        '  <md-progress-circular md-mode="indeterminate"></md-progress-circular>',
        '</div>'
      ].join(''));

      return linkFnc;
    }

    function linkFnc($scope, $element, $attrs) {

      $scope.$watch(function() {
        return LoadingSpinner.get($attrs.loadingSpinner);
      }, function(newVal) {
        if (newVal) {
          $element.css('height', $element.height());
          $element.children(':not(#' + $attrs.loadingSpinner + 'Spinner)').hide();
        } else {
          $element.css('height', 'auto');
          $element.children(':not(#' + $attrs.loadingSpinner + 'Spinner)').show();
        }
      });

      $scope.loading = function() {
        return LoadingSpinner.get($attrs.loadingSpinner);
      };

    }

  }

})();
