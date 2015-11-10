(function() {
  'use strict';

  function profilesInjector(ProfilesRef, profilesMockData) {

    ProfilesRef.set(profilesMockData);

  }

  angular.module('kct.mocks.data.profiles')
    .run([
      'ProfilesRef',
      'profilesMockData',
      '$firebaseObject',
    profilesInjector])
  ;

})();
