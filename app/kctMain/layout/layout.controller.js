(function() {
  'use strict';

  angular.module('kct.layout')
    .controller('LayoutController', ['$state', 'KctAuth', 'leftHeaderStates', 'rightHeaderStates', LayoutController]);

  function LayoutController($state, KctAuth, leftHeaderStates, rightHeaderStates) {
    var _this = this,
        _allStates;

    _this.isCurrentState = isCurrentState;
    _this.hasSubStates = hasSubStates;
    _this.userHasAuthRights = userHasAuthRights;
    _this.logout = logout;

    init();

    function init() {
      _this.leftHeaderStates = _.cloneDeep(leftHeaderStates);
      _this.rightHeaderStates = _.cloneDeep(rightHeaderStates);

      _allStates = _.assign({}, _this.leftHeaderStates, _this.rightHeaderStates);
    }

    function isCurrentState(stateName) {
      return $state.includes(stateName);
    }

    function hasSubStates(stateName) {
      return !!_allStates[stateName].subStates;
    }

    function userHasAuthRights(state) {
      if (_.isBoolean(state.auth)) {
        var authData = KctAuth.$getAuth();
        if (authData) {
          return state.auth === true;
        } else {
          return state.auth === false;
        }
      }
      return true;
    }

    function logout() {
      KctAuth.$unauth();
      $state.go('kct.home');
    }
  }
})();
