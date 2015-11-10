(function() {
  'use strict';

  angular.module('kct.mocks.data.profilePrivateInfos')
    .run([
      'ProfilePrivateInfosRef',
      'profilePrivateInfosMockData',
      profilePrivateInfosInjector
    ])
  ;

  function profilePrivateInfosInjector(ProfilePrivateInfosRef, profilePrivateInfosMockData) {
    ProfilePrivateInfosRef.set(profilePrivateInfosMockData);
  }

})();
