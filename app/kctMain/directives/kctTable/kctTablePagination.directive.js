(function() {
  'use strict';

  angular.module('kct.directives.kctTable')
    .directive('kctTablePagination', [KctTablePaginationDirective])
  ;

  function KctTablePaginationDirective() {
    return {
      restrict    : 'AE',
      scope       : true,
      templateUrl : 'kctMain/directives/kctTable/templates/kctTablePagination.tpl.html',
      link        : link
    };

    function link($scope, $element, $attrs) {
      var _this = $scope.vm = {};

      init();

      function init() {
        _this.tableConfig = $scope.$eval($attrs.kctTableConfig);
        _this.rotate = $attrs.rotate;
        _this.boundaryLinks = $attrs.boundaryLinks;
        _this.maxPages = $attrs.maxPages;
      }

    }

  }

})();
