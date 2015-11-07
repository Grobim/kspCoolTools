(function() {
  'use strict';

  angular.module('kct.layout')
    .constant('leftHeaderStates', {
      'kct.home'        : {
        labelKey : 'kct.layout.header.home'
      },
      'kct.saveManager' : {
        labelKey  : 'kct.layout.header.saveManager.title',
        subStates : {
          'kct.saveManager.saves' : {
            labelKey : 'kct.layout.header.saveManager.saves'
          },
          'kct.saveManager.mods'  : {
            labelKey : 'kct.layout.header.saveManager.mods'
          }
        }
      }
    })
    .constant('rightHeaderStates', {
      'kct.profile' : {
        labelKey : 'kct.layout.header.profile',
        auth  : true
      },
      'kct.login'   : {
        labelKey : 'kct.layout.header.login',
        auth  : false
      }
    })
  ;

})();
