(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods')
    .controller('ModsController', ['$firebaseArray', '$filter', 'ModsRef', 'creationKey', ModsController])
  ;

  function ModsController($firebaseArray, $filter, ModsRef, creationKey) {
    var _this = this;

    _this.creationKey = creationKey;

    init();

    function init() {
      _this.mods = $firebaseArray(ModsRef);
    }

  }

})();
