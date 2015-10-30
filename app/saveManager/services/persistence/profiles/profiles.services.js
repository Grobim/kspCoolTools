(function() {
  'use strict';

  angular.module('kspCoolTools.services.persistence')
    .service('ProfilesService', ['ProfileRef', ProfilesService])
  ;

  function ProfilesService(ProfileRef) {
    return {
      createProfile : createProfile
    };

    function createProfile(profileId, profileData) {
      var profileRef = new ProfileRef(profileId);
      _.assign(profileRef, profileData);
      return profileRef.$save();
    }
  }

})();
