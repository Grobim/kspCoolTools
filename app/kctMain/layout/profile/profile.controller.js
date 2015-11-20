(function() {
  'use strict';

  angular.module('kct.layout.profile')
    .controller('ProfileController', [
      '$scope',
      '$q',
      '$intFirebaseObject',
      'ToastService',
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
    ToastService,
    ProfileRef,
    ProfilePrivateInfoRef,
    KctAuth
  ) {
    var _this = this;

    _this.saveProfile = saveProfile;
    _this.userAuth = KctAuth.$getAuth();

    return init();

    function init() {
      _this.errors = [];
      _this.profile = $intFirebaseObject(new ProfileRef(_this.userAuth.uid));
      _this.profilePrivateInfos = $intFirebaseObject(new ProfilePrivateInfoRef(_this.userAuth.uid));

      $scope.$on('$destroy', function() {
        _this.profilePrivateInfos.$destroy();
      });
    }

    function saveProfile() {
      return $q.all([_this.profile.$save(), _this.profilePrivateInfos.$save()]).then(_notifySave);
    }

    function _notifySave() {
      ToastService.simple('kct.layout.profile.messages.success');
    }
  }

})();
