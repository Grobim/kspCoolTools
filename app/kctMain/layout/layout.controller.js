(function() {
  'use strict';

  angular.module('kct.layout')
    .controller('LayoutController', ['$state', 'KtbAuth', 'headerStates', LayoutController]);

  function LayoutController($state, KtbAuth, headerStates) {
    var _this = this;
    _this.goToState = goToState;
    _this.isCurrentState = isCurrentState;
    _this.userHasAuthRights = userHasAuthRights;
    _this.logout = logout;

    init();

    function init() {
      _this.headerStates = _.cloneDeep(headerStates);

      _this.hello = 'Coucou';
    }

    function goToState(state) {
      if (!$state.is(state)) {
        $state.go(state);
      }
    }

    function isCurrentState(stateName) {
      return $state.includes(stateName);
    }

    function userHasAuthRights(state) {
      if (_.isBoolean(state.auth)) {
        var authData = KtbAuth.$getAuth();
        if (authData) {
          return state.auth === true;
        } else {
          return state.auth === false;
        }
      }
      return true;
    }

    function logout() {
      KtbAuth.$unauth();
      $state.go('kct.home');
    }
  }
})();
