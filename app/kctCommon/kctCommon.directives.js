(function() {
  'use strict';

  angular.module('kct.common')
    .directive('ngShowAuth', ['KctAuth', '$timeout', ngShowAuth])
    .directive('ngHideAuth', ['KctAuth', '$timeout', ngHideAuth])
  ;

  function ngShowAuth(KctAuth, $timeout) {
    return {
      restrict: 'A',
      link: function(scope, el) {
        el.addClass('ng-cloak'); // hide until we process it

        function update() {
          // sometimes if ngCloak exists on same element, they argue, so make sure that
          // this one always runs last for reliability
          $timeout(function () {
            el.toggleClass('ng-cloak', !KctAuth.$getAuth());
          }, 0);
        }

        KctAuth.$onAuth(update);
        update();
      }
    };
  }

  function ngHideAuth(KctAuth, $timeout) {
    return {
      restrict: 'A',
      link: function(scope, el) {
        el.addClass('ng-cloak'); // hide until we process it
        function update() {
          // sometimes if ngCloak exists on same element, they argue, so make sure that
          // this one always runs last for reliability
          $timeout(function () {
            el.toggleClass('ng-cloak', !!KctAuth.$getAuth());
          }, 0);
        }

        KctAuth.$onAuth(update);
        update();
      }
    };
  }

})();
