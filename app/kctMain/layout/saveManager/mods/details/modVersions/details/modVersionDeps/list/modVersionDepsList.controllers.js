(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details.modVersions.details.modVersionDeps.list')
    .controller('ModDetailsModVersionDepListController', [
      '$stateParams',
      '$filter',
      '$intFirebaseArray',
      '$intFirebaseObject',
      '$mdDialog',
      'ModRef',
      'ModsRef',
      'ModVersionDepRef',
      'ModVersionDepsRef',
      'ModVersionDepsService',
      'MdDataTableUtils',
      ModDetailsModVersionDepListController
    ])
    .controller('ModDetailsModVersionDepDialogController', [
      '$mdDialog',
      '$state',
      '$stateParams',
      'ModVersionDepsService',
      'modDetail',
      ModDetailsModVersionDepDialogController
    ])
  ;

  function ModDetailsModVersionDepListController(
    $stateParams,
    $filter,
    $intFirebaseArray,
    $intFirebaseObject,
    $mdDialog,
    ModRef,
    ModsRef,
    ModVersionDepRef,
    ModVersionDepsRef,
    ModVersionDepsService,
    MdDataTableUtils
  ) {
    var _this = this;

    _this.setNewDependence = setNewDependence;
    _this.setEditDependence = setEditDependence;

    _this.removeDependence = removeDependence;

    _this.getFilteredModVersionId = getFilteredModVersionId;

    _this.onDepsListQueryChange = onDepsListQueryChange;
    _this.onModsListQueryChange = onModsListQueryChange;

    return init();

    function init() {

      _this.params = $stateParams;

      _this.depsTableConfig = {
        limit : 5,
        query : '',
        order : 'title',
        page  : 1
      };

      _this.modsTableConfig = {
        limit : 5,
        query : '',
        order : 'title',
        page  : 1
      };

      _this.mod = $intFirebaseObject(new ModRef($stateParams.modId));

      _this.depsList = $intFirebaseArray(new ModVersionDepsRef($stateParams.modId, $stateParams.modVersionId));

      _this.depsList.$watch(function() {
        ModVersionDepsService.addModTitleToDeps(_this.depsList);
      });
      _this.depsList.$watch(onDepsListQueryChange);

      _this.modList = $intFirebaseArray(ModsRef);
      _this.modList.$watch(onModsListQueryChange);

    }

    function setNewDependence(mod, $event) {
     var newDependence = $intFirebaseObject(new ModVersionDepRef($stateParams.modId, $stateParams.modVersionId, mod.$id));
      newDependence.$loaded(function() {
        newDependence.$title = mod.title;
        newDependence.$new = true;
        _openModal(newDependence, $event);
      });
    }

    function setEditDependence(item, $event) {
      var newDependence = $intFirebaseObject(new ModVersionDepRef($stateParams.modId, $stateParams.modVersionId, item.$id));
      newDependence.$loaded(function() {
        newDependence.minVersion = $filter('replaceChars')(newDependence.minVersion, '_', '.');
        newDependence.$title = item.title;
        _openModal(newDependence, $event);
      });
    }

    function removeDependence(item) {
      var removedDependence = $intFirebaseObject(new ModVersionDepRef($stateParams.modId, $stateParams.modVersionId, item.$id));
      removedDependence.$loaded(function() {
        ModVersionDepsService.removeModVersionDep(removedDependence).then(function() {
          onModsListQueryChange();
        });
      });
    }

    function getFilteredModVersionId() {
      return $filter('replaceChars')($stateParams.modVersionId, '_', '.');
    }

    function onDepsListQueryChange() {
      _this.tableDepsList = MdDataTableUtils.onQueryChange(_this.depsList, _this.depsTableConfig);
    }

    function onModsListQueryChange() {
      _this.tableModList = $filter('omitFromField')(_this.modList, _this.depsList, '$id');
      _this.tableModList = $filter('omitFromField')(_this.tableModList, _this.mod, 'title');
      _this.tableModList = MdDataTableUtils.onQueryChange(_this.tableModList, _this.modsTableConfig);
    }

    function _openModal(mod, $event) {
      $mdDialog.show({
        controller          : 'ModDetailsModVersionDepDialogController',
        controllerAs        : 'depDetailsCtrl',
        targetEvent         : $event.originalEvent,
        clickOutsideToClose : true,
        preserveScope       : true,
        locals              : {
          modDetail : mod
        },
        templateUrl         : 'kctMain/layout/saveManager/mods/details/modVersions/details/modVersionDeps/list/modVersionDepsDialog.tpl.html'
      }).then(function() {
        onModsListQueryChange();
      });
    }
  }

  function ModDetailsModVersionDepDialogController(
    $mdDialog,
    $state,
    $stateParams,
    ModVersionDepsService,
    modDetail
  ) {

    var _this = this;

    _this.addDependence = addDependence;
    _this.editDependence = editDependence;
    _this.cancel = cancel;

    _this.isNew = isNew;

    return init();

    function init() {
      _this.depDetails = modDetail;
    }

    function addDependence() {
      ModVersionDepsService.addModVersionDep(_this.depDetails).then(function() {
        $mdDialog.hide();
      });
    }

    function editDependence() {
      ModVersionDepsService.editVersionDep(
        $stateParams.modId,
        $stateParams.modVersionId,
        _this.depDetails
      ).then(function(shouldReload) {
        $mdDialog.hide();
        if (shouldReload) {
          $state.reload();
        }
      });
    }

    function cancel() {
      $mdDialog.cancel();
    }

    function isNew() {
      return !!_this.depDetails.$new;
    }
  }

})();
