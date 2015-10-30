(function() {
  'use strict';

  angular.module('kspCoolTools.layout')
    .constant('headerStates', {
      'kspCoolTools.home'  : {
        label : 'Home'
      },
      'kspCoolTools.profile' : {
        label : 'Profile',
        auth  : true
      },
      'kspCoolTools.login' : {
        label : 'Login',
        auth  : false
      }
    })
  ;

})();
