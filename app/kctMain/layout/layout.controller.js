(function() {
  'use strict';

  angular.module('kct.layout')
    .controller('LayoutController', [
      '$q',
      '$rootScope',
      '$state',
      '$window',
      '$translate',
      '$mdSidenav',
      'KctAuth',
      'i18nService',
      'breadCrumbModelService',
      'menuStates',
      'ToastService',
      LayoutController
    ])
  ;

  function LayoutController(
    $q,
    $rootScope,
    $state,
    $window,
    $translate,
    $mdSidenav,
    KctAuth,
    i18nService,
    breadCrumbModelService,
    menuStates,
    ToastService
  ) {
    var _this = this;

    _this.isCurrentState = isCurrentState;

    _this.userHasAuthRights = userHasAuthRights;
    _this.logout = logout;

    _this.toggleNavbar = toggleNavbar;

    _this.changeLang = changeLang;
    _this.querySearch   = querySearch;

    _this.getTitleKey = getTitleKey;

    return init();

    function init() {

      $rootScope.bcModel = breadCrumbModelService.model;

      _this.menuStates = menuStates;

      _this.langs        = i18nService.getLangList();
      _this.selectedItem = _.find(_this.langs, 'lang', $translate.use());

      $rootScope.$on('$translateChangeSuccess', function(e, data) {
        _this.selectedItem = _.find(_this.langs, 'lang', data.language);
      });

    }

    function isCurrentState(stateName) {
      return $state.includes(stateName);
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
      $state.go('kct.home').then(function() {
        KctAuth.$unauth();
        ToastService.simple('kct.layout.messages.logout');
      });
    }

    function toggleNavbar() {
      var defer = $q.defer();
      $mdSidenav('mainMenu').toggle().then(function() {
        defer.resolve();
        $window.scrollTo(0, 0);
      });
      return defer.promise;
    }

    function changeLang($item) {
      if ($item && $translate.use() !== $item.lang) {
        toggleNavbar().then(function() {
          $translate.use($item.lang);
        });
      }
    }

    function querySearch (query) {
      return query ? _this.langs.filter( _createFilterFor(query)) : _this.langs;
    }

    function getTitleKey() {
      return $state.current.data.titleKey || '';
    }

    function _createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(lang) {
        return lang.lang.indexOf(lowercaseQuery) !== -1 ||
               angular.lowercase(lang.translation).indexOf(lowercaseQuery) !== -1;
      };

    }
  }
})();
