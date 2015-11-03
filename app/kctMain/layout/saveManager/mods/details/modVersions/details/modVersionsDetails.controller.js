(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details.modVersions.details')
    .controller('ModDetailsModVersionsDetailsController', [
      '$state',
      '$stateParams',
      '$timeout',
      '$filter',
      '$firebaseObject',
      'ModRef',
      'ModVersionRef',
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
    ModRef,
    ModVersionRef,
    creationKey
  ) {
    var _this = this,
        _timeout;

    _this.isCreation = isCreation;
    _this.formAction = (isCreation()) ? _createVersion : _editVersion;

    init();

    function init() {

      _this.params = $stateParams;

      _this.mod = $firebaseObject(new ModRef($stateParams.modId));

      if (!isCreation()) {

        _this.modVersion = $firebaseObject(new ModVersionRef($stateParams.modId, $stateParams.modVersionId));

      } else {
        _this.modVersion = {
          desc : ''
        };
      }

    }

    function isCreation() {
      return $stateParams.modVersionId === creationKey;
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
