(function() {
  'use strict';

  angular.module('kct.layout.login')
    .controller('LoginController', [
      '$state',
      '$intFirebaseObject',
      'growl',
      'KctAuth',
      'ProfileRef',
      'ProfilesService',
      LoginController
    ])
  ;

  function LoginController(
    $state,
    $intFirebaseObject,
    growl,
    KctAuth,
    ProfileRef,
    ProfilesService
  ) {
    var _this = this;

    _this.oauthLogin = oauthLogin;
    _this.passwordLogin = passwordLogin;
    _this.createAccount = createAccount;

    function oauthLogin(provider) {
      KctAuth.$authWithOAuthPopup(provider, {rememberMe: true}).then(_checkProfile, _showError);
    }

    function passwordLogin(email, pass) {
      KctAuth.$authWithPassword({email: email, password: pass}, {rememberMe: true}).then(
        _checkProfile, _showError
      );
    }

    function createAccount(email, pass, confirm) {
      if( pass !== confirm ) {
        growl.error('kct.layout.login.emailConnection.errors.passwordsNotMatch');
      }
      else {
        KctAuth.$createUser({email: email, password: pass})
          .then(function () {
            // authenticate so we have permission to write to Firebase
            return KctAuth.$authWithPassword({email: email, password: pass}, {rememberMe: true});
          })
          .then(_checkProfile, _showError);
      }
    }

    function _checkProfile(authData) {
      var authProfile = $intFirebaseObject(new ProfileRef(authData.uid));

      authProfile.$loaded(function() {
        var profileExists = authProfile.$value !== null;

        if (profileExists) {

          growl.success('kct.layout.login.emailConnection.success.login');
          $state.go('kct.home');

        } else {

          ProfilesService.createProfile(authData.uid, _createProfileData(authData))
          .then(function() {
            growl.success('kct.layout.login.emailConnection.success.register');
            $state.go('kct.profile');
          }, _showError);

        }
      })
      .catch(_showError);

      function _createProfileData(authData) {
        var profileData = {
          public : {},
          private : {}
        };

        if (authData.provider === 'password') {
          profileData.public.nickname = _firstPartOfEmail(authData.password.email);
          profileData.private.email = authData.password.email;
        } else {
          profileData.public.nickname = authData[authData.provider].displayName;
        }

        return profileData;

        function _firstPartOfEmail(email) {
          return _ucfirst(email.substr(0, email.indexOf('@'))||'');
        }

        function _ucfirst (str) {
          // inspired by: http://kevin.vanzonneveld.net
          str += '';
          var f = str.charAt(0).toUpperCase();
          return f + str.substr(1);
        }
      }
    }

    function _showError(err) {
      _this.pass = '';
      _this.confirm = '';
      if (err.code === 'EMAIL_TAKEN') {
        growl.error('kct.layout.login.emailConnection.errors.emailTaken');
      } else if (err.code === 'INVALID_PASSWORD') {
        growl.error('kct.layout.login.emailConnection.errors.invalidPassword');
      } else if (err.code === 'INVALID_USER') {
        growl.error('kct.layout.login.emailConnection.errors.invalidUser');
      } else {
        console.log(err, err.code);
        growl.error(err);
      }
    }
  }

})();
