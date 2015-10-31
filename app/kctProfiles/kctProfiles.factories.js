(function() {
  'use strict';

  angular.module('kct.profiles')
    .factory('ProfilesRef', ['$firebaseObject', 'KctRootRef', ProfilesRefFactory])
    .factory('ProfileRef', ['$firebaseObject', 'ProfilesRef', ProfileRefFactory])
  ;

  function ProfilesRefFactory($firebaseObject, KctRootRef) {
    return $firebaseObject(KctRootRef.child('profiles'));
  }

  function ProfileRefFactory($firebaseObject, ProfilesRef) {
    return function(profileId) {
      return $firebaseObject(ProfilesRef.$ref().child(profileId));
    };
  }

})();
