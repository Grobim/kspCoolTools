(function() {
  'use strict';

  angular.module('kct.components.ui.directives.kctMenu')
    .directive('kctMenuLink', [MenuLinkDirective])
  ;

  function MenuLinkDirective() {
    return {
      scope: {
        section          : '=',
        autoFocusContent : '='
      },
      templateUrl: 'kctMain/components/ui/directives/kctMenu/kctMenuLink.tpl.html',
      link: link
    };

    function link($scope) {

      $scope.focusSection = function () {
        // set flag to be used later when
        // $locationChangeSuccess calls openPage()
        $scope.autoFocusContent = true;
      };
    }
  }

})();
