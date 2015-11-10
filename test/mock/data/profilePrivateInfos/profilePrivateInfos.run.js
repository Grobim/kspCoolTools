(function() {
  'use strict';

  function profilePrivateInfosInjector(ProfilePrivateInfosRef, profilePrivateInfosMockData) {
    ProfilePrivateInfosRef.set(profilePrivateInfosMockData);
  }

  angular.module('kct.mocks.data.profilePrivateInfos')
    .run([
      'ProfilePrivateInfosRef',
      'profilePrivateInfosMockData',
      profilePrivateInfosInjector
    ])
  ;

})();
