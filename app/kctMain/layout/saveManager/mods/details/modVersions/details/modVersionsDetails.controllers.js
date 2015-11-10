(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details.modVersions.details')

    .controller('ModDetailsModVersionsDetailsMainController', [
      '$stateParams',
      '$filter',
      '$intFirebaseObject',
      'ModVersionRef',
      'breadCrumbModelService',
      ModDetailsModVersionsDetailsMainController
    ])
    .controller('ModDetailsModVersionsDetailsController', [
      '$state',
      '$stateParams',
      '$timeout',
      '$filter',
      '$intFirebaseObject',
      '$intFirebaseArray',
      'ModRef',
      'ModVersionRef',
      'ModVersionsService',
      'ModVersionDepsRef',
      'ModVersionDepsService',
      'creationKey',
      ModDetailsModVersionsDetailsController
    ])

  ;

  function ModDetailsModVersionsDetailsMainController($stateParams, $filter, $intFirebaseObject, ModVersionRef, breadCrumbModelService) {
    var modVersion = $intFirebaseObject(new ModVersionRef($stateParams.modId, $stateParams.modVersionId));
    modVersion.$loaded(function() {
      modVersion.$formattedVersion = $filter('replaceChars')(modVersion.$id, '_', '.');
    });
    breadCrumbModelService.value('modVersion', modVersion);
  }

  function ModDetailsModVersionsDetailsController(
    $state,
    $stateParams,
    $timeout,
    $filter,
    $intFirebaseObject,
    $intFirebaseArray,
    ModRef,
    ModVersionRef,
    ModVersionsService,
    ModVersionDepsRef,
    ModVersionDepsService,
    creationKey
  ) {
    var _this = this,
        _timeout;

    _this.isCreation = isCreation;
    _this.formAction = (isCreation()) ? _createVersion : _editVersion;
    _this.deleteVersion = deleteVersion;

    init();

    function init() {

      _this.params = $stateParams;
      _this.tableConfig = {
        itemsPerPage : 5
      };

      _this.mod = $intFirebaseObject(new ModRef($stateParams.modId));

      if (!isCreation()) {

        _this.modVersion = $intFirebaseObject(new ModVersionRef($stateParams.modId, $stateParams.modVersionId));
        _this.modVersionDeps = $intFirebaseArray(new ModVersionDepsRef($stateParams.modId, $stateParams.modVersionId));
        _this.modVersionDeps.$watch(function() {
          ModVersionDepsService.addModTitleToDeps(_this.modVersionDeps);
        });

      } else {
        _this.modVersion = {
          desc : ''
        };
      }

    }

    function isCreation() {
      return $stateParams.modVersionId === creationKey;
    }

    function deleteVersion() {
      ModVersionsService.deleteModVersion(_this.modVersion).then(function() {
        $state.go('kct.saveManager.mod.versions', {modId : $stateParams.modId});
      }, function(error) {
        console.error('error, is dep', error);
      });
    }

    function _createVersion() {
      var newModVersion = $intFirebaseObject(new ModVersionRef($stateParams.modId, $filter('replaceChars')(_this.newModVersionId, '.', '_')));
      newModVersion.$loaded(function() {
        if (newModVersion.$value === null) {
          newModVersion.desc = _this.modVersion.desc;
          newModVersion.$save().then(function() {
            $state.go('kct.saveManager.mod.version.details', {modId : $stateParams.modId, modVersionId : newModVersion.$id});
          });
        } else {
          console.error('existe déjà');
        }
      });
    }

    function _editVersion() {
      _this.modVersion.$save().then(_notifySave);
    }

    function _notifySave() {
      _this.saved = true;
      if (_timeout) {
        $timeout.cancel(_timeout);
      }
      _timeout = $timeout(function() {
        _this.saved = false;
        _timeout = null;
      }, 3000);
    }
  }

})();
