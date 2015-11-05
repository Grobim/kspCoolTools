(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details.modVersions.details')
    .controller('ModDetailsModVersionsDetailsController', [
      '$state',
      '$stateParams',
      '$timeout',
      '$filter',
      '$firebaseObject',
      '$firebaseArray',
      'ModRef',
      'ModVersionRef',
      'ModVersionsService',
      'ModVersionDepsRef',
      'ModVersionDepsService',
      'creationKey',
      ModDetailsModVersionsDetailsController
    ])
  ;

  function ModDetailsModVersionsDetailsController(
    $state,
    $stateParams,
    $timeout,
    $filter,
    $firebaseObject,
    $firebaseArray,
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

      _this.mod = $firebaseObject(new ModRef($stateParams.modId));

      if (!isCreation()) {

        _this.modVersion = $firebaseObject(new ModVersionRef($stateParams.modId, $stateParams.modVersionId));
        _this.modVersionDeps = $firebaseArray(new ModVersionDepsRef($stateParams.modId, $stateParams.modVersionId));
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
        $state.go('kct.saveManager.modVersions', {modId : $stateParams.modId});
      }, function(error) {
        console.error('error, is dep', error);
      });
    }

    function _createVersion() {
      var newModVersion = $firebaseObject(new ModVersionRef($stateParams.modId, $filter('replaceChars')(_this.newModVersionId, '.', '_')));
      newModVersion.$loaded(function() {
        if (newModVersion.$value === null) {
          newModVersion.desc = _this.modVersion.desc;
          newModVersion.$save().then(function() {
            $state.go('kct.saveManager.modVersionDetails', {modId : $stateParams.modId, modVersionId : newModVersion.$id});
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
