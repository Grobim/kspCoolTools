angular.module('firebase.config', [])
  .constant('FBURL', 'https://ksp-cool-tools.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password','facebook','google','twitter'])

  .constant('loginRedirectPath', '/login');
