(function() {
  'use strict';

  angular.module('kct.components.interceptors')
    .config(['$firebaseErrorInterceptorProvider', angularFireInterceptor])
  ;

  function angularFireInterceptor($firebaseErrorInterceptorProvider) {
    $firebaseErrorInterceptorProvider.setDefaultHandler(function(error, actionCode) {
      console.log('I see an error here :', actionCode, '-', error.code);
    });
  }

})();
