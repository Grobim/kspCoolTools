(function() {
  'use strict';

  angular.module('kct.layout.home')
    .controller('HomeController', ['$scope', HomeController]);

  function HomeController($scope) {
    var _this = this;

    init();

    function init() {
      _this.hello = 'lala';
      _this.test = $scope.test = 'test';
    }
  }

})();
