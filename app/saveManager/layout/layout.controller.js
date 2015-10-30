(function() {
  'use strict';

  angular.module('kspCoolTools.layout')
    .controller('LayoutController', ['KtbAuth', LayoutController]);

  function LayoutController(KtbAuth) {
    var _this = this;
    _this.hello = 'Coucou';

    init();

    function init() {
      console.log(KtbAuth.$getAuth());
    }
  }
})();
