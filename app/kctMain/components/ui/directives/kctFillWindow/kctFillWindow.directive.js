(function() {
  'use strict';

  angular.module('kct.components.ui.directives.kctFillWindow')
    .directive('kctFillWindow', ['$rootScope', '$timeout', kctFillWindowDirective])
  ;

  function kctFillWindowDirective($rootScope, $timeout) {
    var _active;

    return {
      restrict : 'A',
      link     : {
        post : link
      }
    };

    function link($scope, $element) {

      if (!_active) {
        _active = true;
        _postDigest();
      }

      function _postDigest(){    
        var unregister = $rootScope.$watch(function(){  
          unregister();
          $timeout(function(){
            // console.log(window.innerHeight - ($element.get(0).offsetTop + $element.get(0).offsetHeight));
            var target = $('[kct-fill-window-target]'),
                wHeight = $(window).height(),
                tTop = target.offset().top,
                tHeight = target.outerHeight(),
                tBot = tTop + tHeight;

            if (wHeight > tBot) {
              $element.css('min-height', $element.outerHeight() + wHeight - tBot);
            }

            _postDigest();
          }, 0, false);       
        });
      }
    }
  }

})();
