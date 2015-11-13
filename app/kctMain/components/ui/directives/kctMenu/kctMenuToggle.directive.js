(function() {
  'use strict';

  angular.module('kct.components.ui.directives.kctMenu')
    .directive('kctMenuToggle', ['$state', 'KctMenu', MenuToggleDirective])
  ;

  function MenuToggleDirective($state, KctMenu) {
    return {
      scope: {
        section          : '='
      },
      templateUrl: 'kctMain/components/ui/directives/kctMenu/kctMenuToggle.tpl.html',
      link: link
    };

    function link($scope, $element) {
          
      var parentNode = $element[0].parentNode.parentNode.parentNode;
      if (parentNode.classList.contains('parent-list-item')) {
        var heading = parentNode.querySelector('h2');
        $element[0].firstChild.setAttribute('aria-describedby', heading.id);
      }

      $scope.getCaretIcon = function() {
        if ($scope.isOpen()) {
          return 'keyboard_arrow_up';
        } else {
          return 'keyboard_arrow_down';
        }
      };

      $scope.isCurrentState = function() {
        return $state.includes($scope.section.state);
      };

      $scope.isOpen = function() {
        return KctMenu.isSectionSelected($scope.section);
      };

      $scope.toggle = function() {
        KctMenu.toggleSelectSection($scope.section);
      };
    }
  }

})();
