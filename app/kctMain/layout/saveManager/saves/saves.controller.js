(function() {
  'use strict';

  angular.module('kct.layout.saveManager.saves')
    .controller('SavesController', [
      '$intFirebaseArray',
      'SavesRef',
      SavesController
    ])
  ;

  function SavesController(
    $intFirebaseArray,
    SavesRef
  ) {

    var _this = this;

    init();

    function init() {
      _this.saves = $intFirebaseArray(new SavesRef());
    }


  }

})();
