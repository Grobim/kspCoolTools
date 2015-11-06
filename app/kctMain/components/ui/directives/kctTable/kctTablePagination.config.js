(function() {
  'use strict';

  angular.module('kct.components.ui.directives.kctTable')
    .config(['kctTablePaginationConfigProvider', KctTablePaginationConfig])
  ;

  function KctTablePaginationConfig(kctTablePaginationConfigProvider) {
    kctTablePaginationConfigProvider.set('firstTextKey', 'kct.layout.common.pagination.first');
    kctTablePaginationConfigProvider.set('lastTextKey', 'kct.layout.common.pagination.last');
  }

})();
