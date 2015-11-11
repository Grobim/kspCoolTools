(function() {
  'use strict';

  angular.module('kct.layout')
    .controller('LayoutController', [
      '$rootScope',
      '$state',
      '$translate',
      '$mdSidenav',
      'KctAuth',
      'leftMenuStates',
      'rightHeaderStates',
      'i18nService',
      'breadCrumbModelService',
      'KctMenu',
      LayoutController
    ])
  ;

  function LayoutController(
    $rootScope,
    $state,
    $translate,
    $mdSidenav,
    KctAuth,
    leftMenuStates,
    rightHeaderStates,
    i18nService,
    breadCrumbModelService,
    KctMenu
  ) {
    var _this = this,
        _allStates;

    _this.goToState = goToState;
    _this.isCurrentState = isCurrentState;
    _this.hasSubStates = hasSubStates;

    _this.userHasAuthRights = userHasAuthRights;
    _this.logout = logout;

    _this.toggleNavbar = toggleNavbar;

    _this.changeLang = changeLang;

    init();

    function init() {
      $rootScope.bcModel = breadCrumbModelService.model;

      _this.leftMenuStates = _.cloneDeep(leftMenuStates);
      _this.rightHeaderStates = _.cloneDeep(rightHeaderStates);

      _allStates = _.assign({}, _this.leftMenuStates, _this.rightHeaderStates);

      _this.langs = i18nService.getLangList();
      _this.selectedLang = $translate.use();

      $rootScope.$on('$translateChangeSuccess', function(e, data) {
        _this.selectedLang = data.language;
      });

    }

    function goToState(stateKey) {
      $state.go(stateKey);
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

    function toggleNavbar() {
      $mdSidenav('mainMenu').toggle();
    }

    function changeLang($item) {
      $translate.use($item.lang);
      $state.reload();
    }
    _this.isOpen = isOpen;
    _this.toggleOpen = toggleOpen;
    _this.autoFocusContent = false;
    _this.menu = KctMenu;

    _this.status = {
      isFirstOpen: true,
      isFirstDisabled: false
    };

    function isOpen(section) {
      return KctMenu.isSectionSelected(section);
    }

    function toggleOpen(section) {
      KctMenu.toggleSelectSection(section);
    }
  }
})();
