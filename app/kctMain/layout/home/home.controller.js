(function() {
  'use strict';

  angular.module('kct.layout.home')
    .controller('HomeController', ['$translate', HomeController]);

  function HomeController($translate) {
    var _this = this;

    _this.lang = function(lang) {
      $translate.use(lang);
    };

    init();

    function init() {
      _this.hello = 'lala';
    }
  }

})();
