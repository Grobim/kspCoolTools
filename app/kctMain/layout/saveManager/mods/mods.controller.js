(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods')
    .controller('ModsController', ['ModsRef', ModsController])
  ;

  function ModsController(ModsRef) {
    var _this = this;

    init();

    function init() {
      _this.mods = ModsRef;
    }
  }

})();
