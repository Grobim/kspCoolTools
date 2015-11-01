(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods')
    .controller('ModDetailController', ['$state', '$stateParams', '$firebaseObject', '$firebaseArray', '$timeout', 'ModRef', 'ModsRef', 'creationKey', ModDetailController])
  ;

  function ModDetailController($state, $stateParams, $firebaseObject, $firebaseArray, $timeout, ModRef, ModsRef, creationKey) {
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
      }
    }

    function isCreation() {
      return $stateParams.modId === creationKey;
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
