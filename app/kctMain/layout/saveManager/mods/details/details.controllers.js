(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details')
    
    .controller('ModDetailMainController', [
      '$intFirebaseObject',
      '$stateParams',
      'ModRef',
      'breadCrumbModelService',
      ModDetailMainController
    ])
    .controller('ModDetailController', [
      '$state',
      '$stateParams',
      '$intFirebaseObject',
      '$intFirebaseArray',
      'ToastService',
      'ModRef',
      'ModsRef',
      'ModsService',
      'ModVersionsRef',
      'ModVersionsService',
      'creationKey',
      ModDetailController
    ])

  ;

  function ModDetailMainController($intFirebaseObject, $stateParams, ModRef, breadCrumbModelService) {
    breadCrumbModelService.value('mod', $intFirebaseObject(new ModRef($stateParams.modId)));
  }

  function ModDetailController(
    $state,
    $stateParams,
    $intFirebaseObject,
    $intFirebaseArray,
    ToastService,
    ModRef,
    ModsRef,
    ModsService,
    ModVersionsRef,
    ModVersionsService,
    creationKey
  ) {
    var _this = this;

    _this.createMod = createMod;
    _this.editMod = editMod;
    _this.deleteMod = deleteMod;

    return init();

    function init() {
      if (_isCreation()) {
        _this.mod = {};
      } else {
        _this.mod = $intFirebaseObject(new ModRef($stateParams.modId));

        _this.modVersions = $intFirebaseArray(new ModVersionsRef($stateParams.modId).orderByKey().limitToLast(5));
        _this.modVersions.$watch(function() {
          _this.tableModVersions = _this.modVersions.slice().reverse();
        });
        _this.modVersions.$watch(function() {
          ModVersionsService.addDepLengthToVersions($stateParams.modId, _this.modVersions);
        });
        _this.tableConfig = {
          itemsPerPage : 5
        };
      }
    }

    function _isCreation() {
      return $stateParams.modId === creationKey;
    }

    function createMod() {
      $intFirebaseArray(ModsRef).$add(_this.mod).then(function() {
        $state.go('kct.saveManager.mods');
      });
    }

    function editMod() {
      _this.mod.$save().then(_notifySave);
    }

    function deleteMod() {
      ModsService.deleteMod(_this.mod).then(function() {
        $state.go('kct.saveManager.mods');
      }, function(error) {
        ToastService.error('kct.layout.saveManager.mods.details.edition.errors.isDep');
        console.error('error, is dep', error, error.length);
      });
    }

    function _notifySave() {
      ToastService.simple('kct.layout.messages.saved');
    }
  }

})();
