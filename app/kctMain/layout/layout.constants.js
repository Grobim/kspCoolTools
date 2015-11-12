(function() {
  'use strict';

  angular.module('kct.layout')
    .constant('leftMenuStates', {
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
      },
      'kct.profile' : {
        labelKey : 'kct.layout.header.profile',
        auth  : true
      },
      'kct.login'   : {
        labelKey : 'kct.layout.header.login',
        auth  : false
      }
    })
    .constant('rightHeaderStates', {
    })
    .constant('menuStates', [
      {
        name  : 'kct.layout.header.home',
        state : 'kct.home',
        type  : 'link',
            icon  : 'fa fa-group'
      }, {
        name  : 'kct.layout.header.saveManager.title',
        state : 'kct.saveManager',
        type  : 'toggle',
            icon  : 'fa fa-group',
        pages : [
          {
            name  : 'kct.layout.header.saveManager.saves',
            state : 'kct.saveManager.saves',
            type  : 'link',
            icon  : 'fa fa-group'
          }, {
            name  : 'kct.layout.header.saveManager.mods',
            state : 'kct.saveManager.mods',
            type  : 'link',
            icon  : 'fa fa-map-marker'
          }
        ]
      }, {
        name  : 'kct.layout.header.profile',
        state : 'kct.profile',
        type  : 'link',
        auth  : true,
            icon  : 'fa fa-group'
      }, {
        name  : 'kct.layout.header.login',
        state : 'kct.login',
        type  : 'link',
        auth  : false,
            icon  : 'fa fa-group'
      }
    ])
  ;

})();
