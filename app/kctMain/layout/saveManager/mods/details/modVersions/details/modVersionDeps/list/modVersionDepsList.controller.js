(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details.modVersions.details.modVersionDeps.list')
    .controller('ModDetailsModVersionDepListController', [
      '$state',
      '$stateParams',
      '$filter',
      '$intFirebaseArray',
      '$intFirebaseObject',
      'ModRef',
      'ModsRef',
      'ModVersionDepRef',
      'ModVersionDepsRef',
      'ModVersionDepsService',
      ModDetailsModVersionDepListController
    ])
  ;

  function ModDetailsModVersionDepListController(
    $state,
    $stateParams,
    $filter,
    $intFirebaseArray,
    $intFirebaseObject,
    ModRef,
    ModsRef,
    ModVersionDepRef,
    ModVersionDepsRef,
    ModVersionDepsService
  ) {
    var _this = this;

    _this.setNewDependence = setNewDependence;
    _this.setEditDependence = setEditDependence;

    _this.addDependence = addDependence;
    _this.editDependence = editDependence;
    _this.cancel = cancel;

    _this.removeDependence = removeDependence;

    _this.getFilteredModVersionId = getFilteredModVersionId;

    init();

    function init() {

      _this.params = $stateParams;

      _this.modsTableConfig = {
        itemsPerPage : 5
      };

      _this.mod = $intFirebaseObject(new ModRef($stateParams.modId));

      _this.depsList = $intFirebaseArray(new ModVersionDepsRef($stateParams.modId, $stateParams.modVersionId));
      _this.depsList.$watch(function() {
        ModVersionDepsService.addModTitleToDeps(_this.depsList);
      });

      _this.modList = $intFirebaseArray(ModsRef);

    }

    function setNewDependence(mod) {
      _this.newDependence = $intFirebaseObject(new ModVersionDepRef($stateParams.modId, $stateParams.modVersionId, mod.$id));
      _this.newDependence.$loaded(function() {
        _this.newDependence.$title = mod.title;
        _this.newDependence.$new = true;
      });
    }

    function setEditDependence(item) {
      _this.newDependence = $intFirebaseObject(new ModVersionDepRef($stateParams.modId, $stateParams.modVersionId, item.$id));
      _this.newDependence.$loaded(function() {
        _this.newDependence.minVersion = $filter('replaceChars')(_this.newDependence.minVersion, '_', '.');
        _this.newDependence.$title = item.title;
      });

    }

    function addDependence() {
      ModVersionDepsService.addModVersionDep(_this.newDependence).then(function() {
        _this.newDependence = null;
      });
    }

    function editDependence() {
      ModVersionDepsService.editVersionDep(_this.newDependence).then(function(shouldReload) {
        if (shouldReload) {
          $state.reload();
        } else {
          _this.newDependence = null;
        }
      });
    }

    function cancel() {
      _this.newDependence = null;
    }

    function removeDependence(item) {
      var removedDependence = $intFirebaseObject(new ModVersionDepRef($stateParams.modId, $stateParams.modVersionId, item.$id));
      removedDependence.$loaded(function() {
        ModVersionDepsService.removeModVersionDep(removedDependence);
      });
    }

    function getFilteredModVersionId() {
      return $filter('replaceChars')($stateParams.modVersionId, '_', '.');
    }
  }

})();
