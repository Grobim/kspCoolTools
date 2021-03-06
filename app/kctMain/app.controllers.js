(function() {
  'use strict';

  angular.module('kct')
    .controller('KctMainController', ['$state', KctMainController])
  ;

  function KctMainController($state) {
    var _this = this;

    _this.getBodyClass = getBodyClass;
    _this.getWindowTitleKey = getWindowTitleKey;

    function getBodyClass() {
      if ($state.current && $state.current.data) {
        return $state.current.data.bodyClass;
      } else {
        return '';
      }
    }

    function getWindowTitleKey() {
      var curStateDef = $state.get($state.current.name);
      if (curStateDef && curStateDef.data && curStateDef.data.windowTitleKey) {
        return $state.current.data.windowTitleKey;
      } else {
        return 'kct.layout.common.appName';
      }
    }
  }

})();
