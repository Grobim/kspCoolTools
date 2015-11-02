(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details.modVersions.details')
    .controller('ModDetailsModVersionsDetailsController', [
      '$stateParams',
      '$firebaseObject',
      'ModRef',
      'ModVersionRef',
      'creationKey',
      ModDetailsModVersionsDetailsController
    ])
  ;

  function ModDetailsModVersionsDetailsController(
    $stateParams,
    $firebaseObject,
    ModRef,
    ModVersionRef,
    creationKey
  ) {
    var _this = this;

    _this.isCreation = isCreation;

    init();

    function init() {

      _this.params = $stateParams;

      _this.mod = $firebaseObject(new ModRef($stateParams.modId));

      if (!isCreation()) {

        _this.modVersion = $firebaseObject(new ModVersionRef($stateParams.modId, $stateParams.modVersionId));

      }

    }

    function isCreation() {
      return $stateParams.modVersionId === creationKey;
    }
  }

})();
