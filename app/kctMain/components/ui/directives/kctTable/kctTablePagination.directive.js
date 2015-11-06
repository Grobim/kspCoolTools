(function() {
  'use strict';

  angular.module('kct.components.ui.directives.kctTable')
    .directive('kctTablePagination', [
      '$injector',
      'kctTablePaginationConfig',
      'kctTableConstants',
      KctTablePaginationDirective
    ])
  ;

  function KctTablePaginationDirective(
    $injector,
    kctTablePaginationConfig,
    kctTableConstants
  ) {
    return {
      restrict    : 'AE',
      scope       : true,
      templateUrl : 'kctMain/components/ui/directives/kctTable/templates/kctTablePagination.tpl.html',
      link        : link
    };

    function link($scope, $element, $attrs) {
      var _this = $scope.vm = {};

      init();

      function init() {
        var _conf = kctTablePaginationConfig.get();

        _this.tableConfig = $scope.$eval($attrs.kctTableConfig);
        _this.rotate = $attrs.rotate || _conf.rotate;
        _this.boundaryLinks = $attrs.boundaryLinks || _conf.boundaryLinks;
        _this.maxPages = $attrs.maxPages;

        _.forEach(kctTableConstants.paginationTextFields, function(fieldKey, field) {

          // angular-translate key provided
          if ($attrs[fieldKey] || _conf[fieldKey]) {
            // angular-translate not found
            if (!$injector.has('$translate')) {
              console.warning('Couldn\'t find angular translate, using defaults');
              _this[field] = $attrs[field] || _conf[field];
            } else {
              var $translate = $injector.get('$translate');
              $translate($attrs[fieldKey] || _conf[fieldKey]).then(function(translation) {
                _this[field] = translation;
              });
            }
          } else {
             _this[field] = $attrs[field] || _conf[field];
          }
        });

      }

    }

  }

})();
