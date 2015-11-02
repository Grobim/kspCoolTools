(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details.modVersions.details')
    .controller('ModDetailsModVersionsDetailsController', ['$stateParams', ModDetailsModVersionsDetailsController])
  ;

  function ModDetailsModVersionsDetailsController($stateParams) {
    var _this = this;

    init();

    function init() {

      _this.params = $stateParams;

    }
  }

})();
