(function() {
  'use strict';

  angular.module('kct.profiles')
    .factory('ProfilePrivateInfosRef', ['KctRootRef', ProfilePrivateInfosRef])
    .factory('ProfilePrivateInfoRef', ['ProfilePrivateInfosRef', ProfilePrivateInfoRef])
  ;

  function ProfilePrivateInfosRef(KctRootRef) {
    return KctRootRef.child('profilePrivateInfos');
  }

  function ProfilePrivateInfoRef(ProfilePrivateInfosRef) {
    return function(profileId) {
      return ProfilePrivateInfosRef.child(profileId);
    };
  }

})();
