(function() {
  'use strict';

  angular.module('kct.layout.saveManager.saves.list')
    .controller('SavesController', [
      '$intFirebaseArray',
      'KctAuth',
      'SavesRef',
      'SavesService',
      'MdDataTableUtils',
      'creationKey',
      SavesController
    ])
  ;

  function SavesController(
    $intFirebaseArray,
    KctAuth,
    SavesRef,
    SavesService,
    MdDataTableUtils,
    creationKey
  ) {

    var _this = this;

    _this.onQueryChange = onQueryChange;

    return init();

    function init() {
      _this.tableConfig = {
        order: '',
        limit: 10,
        page: 1
      };

      _this.auth = KctAuth.$getAuth();

      _this.saves = $intFirebaseArray(SavesRef);
      _this.saves.$watch(function() {
        SavesService.addAuthorNameToSaves(_this.saves);
        onQueryChange();
      });

      _this.creationKey = creationKey;
    }

    function onQueryChange() {
      _this.tableSaves = MdDataTableUtils.onQueryChange(_this.saves, _this.tableConfig);
    }

  }

})();
