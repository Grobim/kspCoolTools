(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.list')
    .controller('ModsController', [
      '$intFirebaseArray',
      'ModsRef',
      'creationKey',
      ModsController
    ])
  ;

  function ModsController($intFirebaseArray, ModsRef, creationKey) {
    var _this = this;

    _this.creationKey = creationKey;

    init();

    function init() {
      _this.mods = $intFirebaseArray(ModsRef);
    }

  }

})();
