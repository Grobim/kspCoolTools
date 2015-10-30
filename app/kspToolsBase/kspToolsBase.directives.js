(function() {
  'use strict';

  angular.module('kspToolsBase')
    .directive('ngShowAuth', ['KtbAuth', '$timeout', ngShowAuth])
    .directive('ngHideAuth', ['KtbAuth', '$timeout', ngHideAuth]);

  function ngShowAuth(KtbAuth, $timeout) {
    return {
      restrict: 'A',
      link: function(scope, el) {
        el.addClass('ng-cloak'); // hide until we process it

        function update() {
          // sometimes if ngCloak exists on same element, they argue, so make sure that
          // this one always runs last for reliability
          $timeout(function () {
            el.toggleClass('ng-cloak', !KtbAuth.$getAuth());
          }, 0);
        }

        KtbAuth.$onAuth(update);
        update();
      }
    };
  }

  function ngHideAuth(KtbAuth, $timeout) {
    return {
      restrict: 'A',
      link: function(scope, el) {
        el.addClass('ng-cloak'); // hide until we process it
        function update() {
          // sometimes if ngCloak exists on same element, they argue, so make sure that
          // this one always runs last for reliability
          $timeout(function () {
            el.toggleClass('ng-cloak', !!KtbAuth.$getAuth());
          }, 0);
        }

        KtbAuth.$onAuth(update);
        update();
      }
    };
  }

})();
