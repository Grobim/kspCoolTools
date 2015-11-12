(function() {
  'use strict';

  angular.module('kct.components.ui.directives.kctMenu')
    .directive('kctMenuLink', ['$state', '$mdMedia', '$mdSidenav', MenuLinkDirective])
  ;

  function MenuLinkDirective($state, $mdMedia, $mdSidenav) {
    return {
      scope       : {
        section : '='
      },
      templateUrl : 'kctMain/components/ui/directives/kctMenu/kctMenuLink.tpl.html',
      link        : link
    };

    function link($scope) {

      $scope.goToState = function(stateKey) {
        $state.go(stateKey);

        if ($mdMedia('sm') || $mdMedia('md')) {
          $mdSidenav('mainMenu').close();
        }

      };

      $scope.focusSection = function () {
        // set flag to be used later when
        // $locationChangeSuccess calls openPage()
      };
    }
  }

})();
