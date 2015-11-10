(function() {
  'use strict';

  angular.module('kct.profiles')
    .service('ProfilesService', [
      '$q',
      '$intFirebaseObject',
      'ProfileRef',
      'ProfilePrivateInfoRef',
      ProfilesService
    ])
  ;

  function ProfilesService($q, $intFirebaseObject, ProfileRef, ProfilePrivateInfoRef) {
    return {
      createProfile : createProfile
    };

    function createProfile(profileId, profileData) {
      var profileRef = $intFirebaseObject(new ProfileRef(profileId)),
          profilePrivateInfoRef = $intFirebaseObject(new ProfilePrivateInfoRef(profileId));

      _.assign(profileRef, profileData.public);
      _.assign(profilePrivateInfoRef, profileData.private);

      return $q.all([profileRef.$save(), profilePrivateInfoRef.$save()]);
    }
  }

})();
