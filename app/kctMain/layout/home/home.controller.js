(function() {
  'use strict';

  angular.module('kct.layout.home')
    .controller('HomeController', [HomeController]);

  function HomeController() {
    var _this = this;

    return init();

    function init() {
      _this.hello = 'lala';
    }
  }

})();
