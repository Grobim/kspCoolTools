(function() {
  'use strict';

  angular.module('kct.layout.profile')
    .controller('ProfileController', [
      '$q',
      '$intFirebaseObject',
      'growl',
      'ProfileRef',
      'ProfilePrivateInfoRef',
      'KctAuth',
      ProfileController
    ])
  ;

  function ProfileController($q, $intFirebaseObject, growl, ProfileRef, ProfilePrivateInfoRef, KctAuth) {
    var _this = this,
        _userAuth = KctAuth.$getAuth();

    _this.saveProfile = saveProfile;

    init();

    function init() {
      _this.errors = [];
      _this.profile = $intFirebaseObject(new ProfileRef(_userAuth.uid));
      _this.profilePrivateInfos = $intFirebaseObject(new ProfilePrivateInfoRef(_userAuth.uid));
    }

    function saveProfile() {
      $q.all([_this.profile.$save(), _this.profilePrivateInfos.$save()]).then(_notifySave);
    }

    function _notifySave() {
      growl.success('kct.layout.profile.messages.success');
    }
  }

})();
