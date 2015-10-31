(function() {
  'use strict';

  angular.module('kct.profiles')
    .service('ProfilesService', ['$firebaseObject', 'ProfileRef', ProfilesService])
  ;

  function ProfilesService($firebaseObject, ProfileRef) {
    return {
      createProfile : createProfile
    };

    function createProfile(profileId, profileData) {
      var profileRef = $firebaseObject(new ProfileRef(profileId));
      _.assign(profileRef, profileData);
      return profileRef.$save();
    }
  }

})();
