(function() {
  'use strict';

  angular.module('kct')
    .controller('KctMainController', ['$state', KctMainController])
  ;

  function KctMainController($state) {
    var _this = this;

    _this.getBodyClass = getBodyClass;

    function getBodyClass() {
      if ($state.current && $state.current.data) {
        return $state.current.data.bodyClass;
      } else {
        return '';
      }
    }
  }

})();
