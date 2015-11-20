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
      '$intFirebaseObject',
      'SaveRef',
      'creationKey',
      SaveDetailsController
    ])
  ;

  function SavesDetailsMainController($intFirebaseObject, $stateParams, SaveRef, breadCrumbModelService) {

    breadCrumbModelService.value('save', $intFirebaseObject(new SaveRef($stateParams.saveId)));

  }

  function SaveDetailsController(
    $stateParams,
    $intFirebaseObject,
    SaveRef,
    creationKey
  ) {

    var _this = this;

    _this.isCreation = isCreation;
    _this.getDetailsFlex = getDetailsFlex;

    return init();

    function init() {
      if (isCreation()) {
        _this.save = {};
      } else {
        _this.save = $intFirebaseObject(new SaveRef($stateParams.saveId));
      }
    }

    function isCreation() {
      return $stateParams.saveId === creationKey;
    }

    function getDetailsFlex() {
      if (isCreation()) {
        return 70;
      } else {
        return '';
      }
    }

  }

})();
