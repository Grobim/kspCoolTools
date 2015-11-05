(function() {
  'use strict';

  angular.module('kct.layout.saveManager.saves')
    .controller('SavesController', [
      '$firebaseArray',
      'SavesRef',
      SavesController
    ])
  ;

  function SavesController(
    $firebaseArray,
    SavesRef
  ) {

    var _this = this;

    init();

    function init() {
      _this.saves = $firebaseArray(new SavesRef());
    }


  }

})();
