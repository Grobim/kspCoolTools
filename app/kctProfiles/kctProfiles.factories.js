(function() {
  'use strict';

  angular.module('kct.profiles')
    .factory('ProfilesRef', ['$firebaseObject', 'KtbRootRef', ProfilesRefFactory])
    .factory('ProfileRef', ['$firebaseObject', 'ProfilesRef', ProfileRefFactory])
  ;

  function ProfilesRefFactory($firebaseObject, KtbRootRef) {
    return $firebaseObject(KtbRootRef.child('profiles'));
  }

  function ProfileRefFactory($firebaseObject, ProfilesRef) {
    return function(profileId) {
      return $firebaseObject(ProfilesRef.$ref().child(profileId));
    };
  }

})();
