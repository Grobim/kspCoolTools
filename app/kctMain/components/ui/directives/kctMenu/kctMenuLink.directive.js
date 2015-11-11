(function() {
  'use strict';

  angular.module('kct.components.ui.directives.kctMenu')
    .directive('kctMenuLink', [MenuLinkDirective])
  ;

  function MenuLinkDirective() {
    return {
      scope: {
        section: '='
      },
      templateUrl: 'kctMain/components/ui/directives/kctMenu/kctMenuLink.tpl.html',
      link: link
    };

    function link($scope, $element) {
      var controller = $element.parent().controller();

      $scope.focusSection = function () {
        // set flag to be used later when
        // $locationChangeSuccess calls openPage()
        controller.autoFocusContent = true;
      };
    }
  }

})();
