(function() {
  'use strict';

  angular.module('kct.layout.saveManager.saves.details')
    .controller('SavesDetailsMainController', [
      '$intFirebaseObject',
      '$stateParams',
      'SaveRef',
      'breadCrumbModelService',
      SavesDetailsMainController
    ])
    .controller('SaveDetailsController', [
      '$stateParams',
      SaveDetailsController
    ])
  ;

  function SavesDetailsMainController($intFirebaseObject, $stateParams, SaveRef, breadCrumbModelService) {

    breadCrumbModelService.value('save', $intFirebaseObject(new SaveRef($stateParams.saveId)));

  }

  function SaveDetailsController($stateParams) {

    var _this = this;

    init();

    function init() {
      _this.id = $stateParams.saveId;
    }

  }

})();
