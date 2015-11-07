(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details')
    .controller('ModDetailController', [
      '$state',
      '$stateParams',
      '$firebaseObject',
      '$firebaseArray',
      '$timeout',
      'ModRef',
      'ModsRef',
      'ModsService',
      'ModVersionsRef',
      'ModVersionsService',
      'creationKey',
      ModDetailController
    ])
  ;

  function ModDetailController($state,
                               $stateParams,
                               $firebaseObject,
                               $firebaseArray,
                               $timeout,
                               ModRef,
                               ModsRef,
                               ModsService,
                               ModVersionsRef,
                               ModVersionsService,
                               creationKey) {
    var _this = this,
        _timeout;

    _this.createMod = createMod;
    _this.editMod = editMod;
    _this.deleteMod = deleteMod;

    init();

    function init() {
      if (_isCreation()) {
        _this.mod = {};
      } else {
        _this.mod = $firebaseObject(new ModRef($stateParams.modId));
        _this.modVersions = $firebaseArray(new ModVersionsRef($stateParams.modId).orderByKey().limitToLast(5));
        _this.modVersions.$loaded(_reverseList);
        _this.modVersions.$watch(function() {
          ModVersionsService.addDepLengthToVersions(_this.modVersions);
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
      $firebaseArray(ModsRef).$add(_this.mod).then(function() {
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
        console.error('error, is dep', error);
      });
    }

    function _reverseList() {
      _this.modVersions = _this.modVersions.reverse();
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
