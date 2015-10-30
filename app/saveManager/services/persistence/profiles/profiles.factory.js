(function() {
  'use strict';

  angular.module('kspCoolTools.services.persistence')
    .factory('ProfilesRef', ['$firebaseObject', 'KtbRootRef', ProfilesRefFactory])
  ;

  function ProfilesRefFactory($firebaseObject, KtbRootRef) {
    return $firebaseObject(KtbRootRef.child('profiles'));
  }

})();
