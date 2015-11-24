(function() {
  'use strict';

  angular.module('kct.profiles')
    .factory('PublicProfilePrivateInfosRef', ['KctRootRef', PublicProfilePrivateInfosRefFactory])
    .factory('PublicProfilePrivateInfoRef', ['PublicProfilePrivateInfosRef', PublicProfilePrivateInfoRefFactory])
    .factory('PublicProfilePrivateInfoKeyRef', ['PublicProfilePrivateInfoRef', PublicProfilePrivateInfoKeyRefFactory])
  ;

  function PublicProfilePrivateInfosRefFactory(KctRootRef) {
    return KctRootRef.child('publicProfilePrivateInfos');
  }

  function PublicProfilePrivateInfoRefFactory(PublicProfilePrivateInfosRef) {
    return function(userId) {
      return PublicProfilePrivateInfosRef.child(userId);
    };
  }

  function PublicProfilePrivateInfoKeyRefFactory(PublicProfilePrivateInfoRef) {
    return function(userId, key) {
      return new PublicProfilePrivateInfoRef(userId).child(key);
    };
  }

})();
