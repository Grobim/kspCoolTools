(function() {
  'use strict';

  angular.module('kct.mocks.data.profiles')
    .run([
      'ProfilesRef',
      'profilesMockData',
      '$firebaseObject',
      profilesInjector
    ])
  ;

  function profilesInjector(ProfilesRef, profilesMockData) {

    ProfilesRef.set(profilesMockData);

  }

})();
