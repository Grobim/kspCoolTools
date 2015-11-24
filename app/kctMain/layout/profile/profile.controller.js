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
      'LoadingSpinner',
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
    LoadingSpinner,
    KctAuth
  ) {
    var _this = this;

    _this.saveProfile = saveProfile;
    _this.userAuth = KctAuth.$getAuth();

    return init();

    function init() {

      LoadingSpinner.loading('profilePublicInfosLoad');
      LoadingSpinner.loading('profilePrivateInfosLoad');

      _this.profile = $intFirebaseObject(new ProfileRef(_this.userAuth.uid));
      _this.profilePrivateInfos = $intFirebaseObject(new ProfilePrivateInfoRef(_this.userAuth.uid));

      _this.profile.$loaded(function() {
        LoadingSpinner.loaded('profilePublicInfosLoad');
      }, function() {
        LoadingSpinner.loaded('profilePublicInfosLoad');
      });

      _this.profilePrivateInfos.$loaded(function() {
        LoadingSpinner.loaded('profilePrivateInfosLoad');
      }, function() {
        LoadingSpinner.loaded('profilePrivateInfosLoad');
      });

      $scope.$on('$destroy', function() {
        _this.profilePrivateInfos.$destroy();
      });
    }

    function saveProfile() {
      return $q.all([_this.profile.$save(), _this.profilePrivateInfos.$save()]).then(_notifySave);
    }

    function _notifySave() {
      _this.profileForm.$setPristine();
      ToastService.simple('kct.layout.profile.messages.success');
    }
  }

})();
