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
    .constant('menuStates', {
      name: 'Beers',
      type: 'toggle',
      pages: [{
        name: 'IPAs',
        type: 'link',
        state: 'beers.ipas',
        icon: 'fa fa-group'
      }, {
        name: 'Porters',
        state: 'home.toollist',
        type: 'link',
        icon: 'fa fa-map-marker'
      },
      {
        name: 'Wheat',
        state: 'home.createTool',
        type: 'link',
        icon: 'fa fa-plus'
      }]
    })
  ;

})();
