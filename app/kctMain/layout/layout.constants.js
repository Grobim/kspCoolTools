(function() {
  'use strict';

  angular.module('kct.layout')
    .constant('headerStates', {
      'kct.home'  : {
        label : 'Home'
      },
      'kct.profile' : {
        label : 'Profile',
        auth  : true
      },
      'kct.login' : {
        label : 'Login',
        auth  : false
      }
    })
  ;

})();
