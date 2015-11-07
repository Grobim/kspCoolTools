(function() {
  'use strict';

  angular.module('kct.profiles')
    .service('ProfilesService', [
      '$q',
      '$firebaseObject',
      'ProfileRef',
      'ProfilePrivateInfoRef',
      ProfilesService
    ])
  ;

  function ProfilesService($q, $firebaseObject, ProfileRef, ProfilePrivateInfoRef) {
    return {
      createProfile : createProfile
    };

    function createProfile(profileId, profileData) {
      var profileRef = $firebaseObject(new ProfileRef(profileId)),
          profilePrivateInfoRef = $firebaseObject(new ProfilePrivateInfoRef(profileId));

      _.assign(profileRef, profileData.public);
      _.assign(profilePrivateInfoRef, profileData.private);

      return $q.all([profileRef.$save(), profilePrivateInfoRef.$save()]);
    }
  }

})();
