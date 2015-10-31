(function() {
  'use strict';

  angular.module('kct.profiles')
    .factory('ProfilesRef', ['KctRootRef', ProfilesRefFactory])
    .factory('ProfileRef', ['ProfilesRef', ProfileRefFactory])
  ;

  function ProfilesRefFactory(KctRootRef) {
    return KctRootRef.child('profiles');
  }

  function ProfileRefFactory(ProfilesRef) {
    return function(profileId) {
      return ProfilesRef.child(profileId);
    };
  }

})();
