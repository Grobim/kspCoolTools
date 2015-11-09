(function() {
  'use strict';

  angular.module('kct.components.ui.growl')
    .config(['growlProvider', GrowlConfig])
  ;

  function GrowlConfig(growlProvider) {
    growlProvider.globalTimeToLive(4000);
    growlProvider.globalDisableCountDown(true);
    growlProvider.onlyUniqueMessages(false);
    growlProvider.globalReversedOrder(true);
  }

})();
