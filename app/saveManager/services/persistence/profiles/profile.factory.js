(function() {
  'use strict';

  angular.module('kspCoolTools.services.persistence')
    .factory('ProfileRef', ['$firebaseObject', 'ProfilesRef', ProfileRefFactory])
  ;

  function ProfileRefFactory($firebaseObject, ProfilesRef) {
    return function(profileId) {
      return $firebaseObject(ProfilesRef.$ref().child(profileId));
    };
  }

})();
