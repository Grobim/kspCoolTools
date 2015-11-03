(function() {
  'use strict';

  angular.module('kct')
    .controller('KctMainController', ['$state', KctMainController])
  ;

  function KctMainController($state) {
    var _this = this;

    _this.getBodyClass = getBodyClass;

    function getBodyClass() {
      return $state.current.data.bodyClass;
    }
  }

})();
