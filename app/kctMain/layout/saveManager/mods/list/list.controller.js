(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods')
    .controller('ModsController', ['$firebaseObject', 'ModsRef', ModsController])
  ;

  function ModsController($firebaseObject, ModsRef) {
    var _this = this;

    init();

    function init() {
      _this.mods = $firebaseObject(ModsRef);
    }
  }

})();
