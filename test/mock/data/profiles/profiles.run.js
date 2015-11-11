(function() {
  'use strict';

  angular.module('kct.mocks.data.profiles')
    .run([
      'ProfilesRef',
      'profilesMockData',
      profilesInjector
    ])
  ;

  function profilesInjector(ProfilesRef, profilesMockData) {

    ProfilesRef.set(profilesMockData);

  }

})();
