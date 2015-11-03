(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details.modVersions.details.modVersionDeps.list')
    .controller('ModDetailsModVersionDepListController', [
      '$stateParams',
      '$filter',
      '$firebaseArray',
      '$firebaseObject',
      'ModRef',
      'ModsRef',
      'ModVersionDepRef',
      'ModVersionDepsRef',
      'ModVersionDepsService',
      ModDetailsModVersionDepListController
    ])
  ;

  function ModDetailsModVersionDepListController(
    $stateParams,
    $filter,
    $firebaseArray,
    $firebaseObject,
    ModRef,
    ModsRef,
    ModVersionDepRef,
    ModVersionDepsRef,
    ModVersionDepsService
  ) {
    var _this = this;

    _this.setNewDependence = setNewDependence;
    _this.addDependence = addDependence;
    _this.cancel = cancel;

    _this.removeDependence = removeDependence;
    _this.editDependence = editDependence;

    init();

    function init() {

      _this.params = $stateParams;

      _this.modsTableConfig = {
        itemsPerPage : 5
      };

      _this.mod = $firebaseObject(new ModRef($stateParams.modId));

      _this.depsList = $firebaseArray(new ModVersionDepsRef($stateParams.modId, $stateParams.modVersionId));
      _this.depsList.$watch(function() {
        ModVersionDepsService.addModTitleToDeps(_this.depsList);
      });

      _this.modList = $firebaseArray(ModsRef);

    }

    function setNewDependence(mod) {
      _this.newDependence = $firebaseObject(new ModVersionDepRef($stateParams.modId, $stateParams.modVersionId, mod.$id));
      _this.newDependence.$loaded(function() {
        _this.newDependence.$title = mod.title;
        _this.newDependence.$new = true;
      });
    }

    function addDependence() {
      _this.newDependence.$save().then(function() {
        _this.newDependence = null;
      });
    }

    function cancel() {
      _this.newDependence = null;
    }

    function removeDependence(item) {
      $firebaseObject(new ModVersionDepRef($stateParams.modId, $stateParams.modVersionId, item.$id)).$remove();
    }

    function editDependence(item) {
      _this.newDependence = $firebaseObject(new ModVersionDepRef($stateParams.modId, $stateParams.modVersionId, item.$id));
      _this.newDependence.$loaded(function() {
        _this.newDependence.minVersion = $filter('replaceChars')(_this.newDependence.minVersion, '_', '.');
        _this.newDependence.$title = item.title;
      });

    }
  }

})();
