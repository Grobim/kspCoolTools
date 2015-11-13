(function() {
  'use strict';

  angular.module('kct.layout.profile')
    .controller('ProfileController', [
      '$scope',
      '$q',
      '$intFirebaseObject',
      'growl',
      'ProfileRef',
      'ProfilePrivateInfoRef',
      'KctAuth',
      ProfileController
    ])
  ;

  function ProfileController(
    $scope,
    $q,
    $intFirebaseObject,
    growl,
    ProfileRef,
    ProfilePrivateInfoRef,
    KctAuth
  ) {
    var _this = this;

    _this.saveProfile = saveProfile;
    _this.userAuth = KctAuth.$getAuth();

    init();

    function init() {
      _this.errors = [];
      _this.profile = $intFirebaseObject(new ProfileRef(_this.userAuth.uid));
      _this.profilePrivateInfos = $intFirebaseObject(new ProfilePrivateInfoRef(_this.userAuth.uid));

      $scope.$on('$destroy', function() {
        _this.profilePrivateInfos.$destroy();
      });
    }

    function saveProfile() {
      $q.all([_this.profile.$save(), _this.profilePrivateInfos.$save()]).then(_notifySave);
    }

    function _notifySave() {
      growl.success('kct.layout.profile.messages.success');
    }
  }

})();
