(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.list')
    .controller('ModsController', ['$firebaseArray', 'ModsRef', 'creationKey', ModsController])
  ;

  function ModsController($firebaseArray, ModsRef, creationKey) {
    var _this = this;

    _this.creationKey = creationKey;

    init();

    function init() {
      _this.mods = $firebaseArray(ModsRef);
    }

  }

})();
