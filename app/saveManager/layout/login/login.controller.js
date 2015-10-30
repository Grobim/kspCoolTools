(function() {
  'use strict';

  angular.module('kspCoolTools.layout.login')
    .controller('LoginController', ['$state', 'KtbAuth', 'ProfileRef', 'ProfilesService', LoginController])
  ;

  function LoginController($state, KtbAuth, ProfileRef, ProfilesService) {
    var _this = this;

    _this.oauthLogin = oauthLogin;
    _this.passwordLogin = passwordLogin;
    _this.createAccount = createAccount;

    function oauthLogin(provider) {
      _this.err = null;
      KtbAuth.$authWithOAuthPopup(provider, {rememberMe: true}).then(_checkProfile, _showError);
    }

    function passwordLogin(email, pass) {
      _this.err = null;
      KtbAuth.$authWithPassword({email: email, password: pass}, {rememberMe: true}).then(
        _checkProfile, _showError
      );
    }

    function createAccount(email, pass, confirm) {
      _this.err = null;
      if( !pass ) {
        _this.err = 'Please enter a password';
      }
      else if( pass !== confirm ) {
        _this.err = 'Passwords do not match';
      }
      else {
        KtbAuth.$createUser({email: email, password: pass})
          .then(function () {
            // authenticate so we have permission to write to Firebase
            return KtbAuth.$authWithPassword({email: email, password: pass}, {rememberMe: true});
          })
          .then(_checkProfile, _showError);
      }
    }

    function _checkProfile(authData) {
      console.log(authData);
      var authProfile = new ProfileRef(authData.uid);

      authProfile.$loaded(function() {
        var profileExists = authProfile.$value !== null;

        if (profileExists) {

          $state.go('kspCoolTools.home');

        } else {

          ProfilesService.createProfile(authData.uid, _createProfileData(authData))
          .then(function() {
            $state.go('kspCoolTools.profile');
          }, _showError);

        }
      })
      .catch(_showError);

      function _createProfileData(authData) {
        var profileData = {};

        if (authData.provider === 'password') {
          profileData.nickname = _firstPartOfEmail(authData.password.email);
          profileData.email = authData.password.email;
        } else {
          profileData.nickname = authData[authData.provider].displayName;
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
      _this.err = err;
    }
  }

})();
