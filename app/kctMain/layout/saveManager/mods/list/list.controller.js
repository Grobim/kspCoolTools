(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.list')
    .controller('ModsController', [
      '$intFirebaseArray',
      'ModsRef',
      'MdDataTableUtils',
      'creationKey',
      ModsController
    ])
  ;

  function ModsController($intFirebaseArray, ModsRef, MdDataTableUtils, creationKey) {
    var _this = this;

    _this.onQueryChange = onQueryChange;

    return init();

    function init() {

      _this.tableConfig = {
        order: '',
        limit: 10,
        page: 1
      };

      _this.mods = $intFirebaseArray(ModsRef);
      _this.mods.$watch(onQueryChange);

      _this.creationKey = creationKey;
    }

    function onQueryChange() {
      _this.tableMods = MdDataTableUtils.onQueryChange(_this.mods, _this.tableConfig);
    }

  }

})();
