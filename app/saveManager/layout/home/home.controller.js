(function() {
  'use strict';

  angular.module('kspCoolTools.layout.home')
    .controller('HomeController', [HomeController]);

  function HomeController() {
    var _this = this;

    init();

    function init() {
      _this.hello = 'lala';
    }
  }

})();
