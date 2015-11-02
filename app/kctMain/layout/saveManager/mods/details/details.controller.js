(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods')
    .controller('ModDetailController', [
      '$scope',
      '$state',
      '$stateParams',
      '$firebaseObject',
      '$firebaseArray',
      '$filter',
      '$timeout',
      'ModRef',
      'ModsRef',
      'ModVersionsRef',
      'creationKey',
      ModDetailController
    ])
  ;

  function ModDetailController($scope,
                               $state,
                               $stateParams,
                               $firebaseObject,
                               $firebaseArray,
                               $filter,
                               $timeout,
                               ModRef,
                               ModsRef,
                               ModVersionsRef,
                               creationKey) {
    var _this = this,
        _timeout;

    _this.isCreation = isCreation;
    _this.formAction = (isCreation()) ? _createMod : _editMod;
    init();

    function init() {
      if (isCreation()) {
        _this.mod = {};
      } else {
        _this.mod = $firebaseObject(new ModRef($stateParams.modId));
        _this.modVersions = $firebaseArray(new ModVersionsRef($stateParams.modId).orderByKey().limitToLast(5));
        _this.modVersions.$loaded(_reverseList);
        _this.tableConfig = {
          itemsPerPage : 5
        };
      }
    }

    function isCreation() {
      return $stateParams.modId === creationKey;
    }

    function _reverseList() {
      _this.modVersions = _this.modVersions.reverse();
    }

    function _createMod() {
      $firebaseArray(ModsRef).$add(_this.mod).then(function() {
        $state.go('kct.saveManager.mods');
      });
    }

    function _editMod() {
      _this.mod.$save().then(_notifySave);
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
