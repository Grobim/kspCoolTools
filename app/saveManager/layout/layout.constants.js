(function() {
  'use strict';

  angular.module('kspCoolTools.layout')
    .constant('headerStates', {
      'kspCoolTools.home' : {
        label : 'Home'
      },
      'kspCoolTools.testCo' : {
        label : 'TestCo',
        auth  : true
      },
      'kspCoolTools.testPasCo' : {
        label : 'TestPasCo',
        auth  : false
      }
    })
  ;

})();
