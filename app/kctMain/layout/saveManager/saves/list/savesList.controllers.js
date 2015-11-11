(function() {
  'use strict';

  angular.module('kct.layout.saveManager.saves.list')
    .controller('SavesController', [
      '$intFirebaseArray',
      'SavesRef',
      'SavesService',
      SavesController
    ])
  ;

  function SavesController(
    $intFirebaseArray,
    SavesRef,
    SavesService
  ) {

    var _this = this;

    init();

    function init() {
      _this.saves = $intFirebaseArray(SavesRef);
      _this.saves.$loaded(function() {
        SavesService.addAuthorNameToSaves(_this.saves);
      });
    }


  }

})();
