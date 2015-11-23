(function() {
  'use strict';

  angular.module('kct.layout')
    .constant('menuStates', [
      {
        name  : 'kct.layout.header.home',
        state : 'kct.home',
        type  : 'link',
        icon  : 'home'
      }, {
        name  : 'kct.layout.header.saveManager.title',
        state : 'kct.saveManager',
        type  : 'toggle',
        pages : [
          {
            name  : 'kct.layout.header.saveManager.saves',
            state : 'kct.saveManager.saves',
            type  : 'link'
          }, {
            name  : 'kct.layout.header.saveManager.mods',
            state : 'kct.saveManager.mods',
            type  : 'link'
          }
        ]
      }, {
        name  : 'kct.layout.header.profile',
        state : 'kct.profile',
        type  : 'link',
        icon  : 'person'
      }, {
        name  : 'kct.layout.header.login',
        state : 'kct.login',
        type  : 'link',
        icon  : 'login'
      }
    ])
  ;

})();
