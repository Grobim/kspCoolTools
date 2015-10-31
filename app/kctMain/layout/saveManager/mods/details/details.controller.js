(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods')
    .controller('ModDetailController', ['$stateParams', ModDetailController])
  ;

  function ModDetailController($stateParams) {
    var _this = this;

    _this.hello = 'Coucou ' + $stateParams.modId;
  }

})();
