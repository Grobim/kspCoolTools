(function() {
  'use strict';

  angular.module('kspCoolTools.layout')
    .controller('LayoutController', [LayoutController]);

  function LayoutController() {
    var _this = this;
    _this.hello = 'Coucou';

    init();

    function init() {

    }
  }
})();
