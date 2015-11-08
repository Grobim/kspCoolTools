(function() {
  'use strict';

  angular.module('kct.layout.profile')
    .controller('ProfileController', [
      '$q',
      '$intFirebaseObject',
      '$timeout',
      'ProfileRef',
      'ProfilePrivateInfoRef',
      'KctAuth',
      ProfileController
    ])
  ;

  function ProfileController($q, $intFirebaseObject, $timeout, ProfileRef, ProfilePrivateInfoRef, KctAuth) {
    var _this = this,
        _userAuth = KctAuth.$getAuth(),
        _timeout;

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
      _this.saved = true;
      if (_timeout) {
        $timeout.cancel(_timeout);
      }
      _timeout = $timeout(function() {
        _this.saved = false;
        _timeout = null;
      }, 3000);
    }
  }

})();
