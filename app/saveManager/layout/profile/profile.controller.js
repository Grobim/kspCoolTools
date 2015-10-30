(function() {
  'use strict';

  angular.module('kspCoolTools.layout.profile')
    .controller('ProfileController', [ProfileController])
  ;

  function ProfileController() {
    var _this = this;

    init();

    function init() {
      _this.hello = 'Coucou !';
    }
  }

})();
