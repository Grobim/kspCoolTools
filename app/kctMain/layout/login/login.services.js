(function() {
  'use strict';

  angular.module('kct.layout.login')
    .service('LoginRooterService', ['$state', LoginRooterService])
  ;

  function LoginRooterService($state) {
    var _previousState,
        _previousParams;
    return {
      previousState     : previousState,
      clear             : clear,
      goToPreviousState : goToPreviousState
    };

    function previousState(stateSet, paramsSet) {
      if (stateSet) {
        _previousState = stateSet;
        if (paramsSet) {
          _previousParams = paramsSet;
        }
      }
      return {
        state  : _previousState,
        params : _previousParams
      };
    }

    function clear() {
      _previousState = null;
      _previousParams = null;
    }

    function goToPreviousState() {
      if (_previousState) {
        $state.go(_previousState.name, _previousParams);
      } else {
        $state.go('kct.home');
      }
    }

  }

})();
