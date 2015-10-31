(function() {
  'use strict';

  angular.module('kct.layout')
    .constant('leftHeaderStates', {
      'kct.home'        : {
        label : 'Home'
      },
      'kct.saveManager' : {
        label     : 'Save Manager',
        subStates : {
          'kct.saveManager.saves' : {
            label : 'Saves'
          },
          'kct.saveManager.mods'  : {
            label : 'Mods'
          }
        }
      }
    })
    .constant('rightHeaderStates', {
      'kct.profile' : {
        label : 'Profile',
        auth  : true
      },
      'kct.login'   : {
        label : 'Login',
        auth  : false
      }
    })
  ;

})();
