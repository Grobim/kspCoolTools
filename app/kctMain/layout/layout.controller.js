(function() {
  'use strict';

  angular.module('kct.layout')
    .controller('LayoutController', [
      '$rootScope',
      '$state',
      '$translate',
      'KctAuth',
      'leftHeaderStates',
      'rightHeaderStates',
      'i18nService',
      'breadCrumbModelService',
      LayoutController
    ]);

  function LayoutController(
    $rootScope,
    $state,
    $translate,
    KctAuth,
    leftHeaderStates,
    rightHeaderStates,
    i18nService,
    breadCrumbModelService
  ) {
    var _this = this,
        _allStates;

    _this.isCurrentState = isCurrentState;
    _this.hasSubStates = hasSubStates;
    _this.userHasAuthRights = userHasAuthRights;
    _this.logout = logout;

    _this.changeLang = changeLang;

    init();

    function init() {
      $rootScope.bcModel = breadCrumbModelService.model;

      _this.leftHeaderStates = _.cloneDeep(leftHeaderStates);
      _this.rightHeaderStates = _.cloneDeep(rightHeaderStates);

      _allStates = _.assign({}, _this.leftHeaderStates, _this.rightHeaderStates);

      _this.langs = i18nService.getLangList();
      _this.selectedLang = $translate.use();

      $rootScope.$on('$translateChangeSuccess', function(e, data) {
        _this.selectedLang = data.language;
      });

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

    function changeLang($item) {
      $translate.use($item.lang);
      $state.reload();
    }
  }
})();
