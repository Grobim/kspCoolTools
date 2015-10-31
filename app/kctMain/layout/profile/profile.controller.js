(function() {
  'use strict';

  angular.module('kct.layout.profile')
    .controller('ProfileController', ['$timeout', 'ProfileRef', 'KctAuth', ProfileController])
  ;

  function ProfileController($timeout, ProfileRef, KctAuth) {
    var _this = this,
        _userAuth = KctAuth.$getAuth(),
        _timeout;

    _this.saveProfile = saveProfile;

    init();

    function init() {
      _this.errors = [];
      _this.profile = new ProfileRef(_userAuth.uid);
    }

    function saveProfile() {
      _this.profile.$save().then(_notifySave, _error);
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

    function _error(err) {
      var error = {text : err + ''};
      _this.errors.unshift(error);
      $timeout(function() {
        _this.errors.splice(_this.errors.indexOf(error), 1);
      }, 3000);
    }
  }

})();
