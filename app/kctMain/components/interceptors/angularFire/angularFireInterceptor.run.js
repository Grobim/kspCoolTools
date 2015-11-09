(function() {
  'use strict';

  angular.module('kct.components.interceptors')
    .run(['$firebaseErrorInterceptor', 'growl', angularFireInterceptor])
  ;

  function angularFireInterceptor($firebaseErrorInterceptor, growl) {
    $firebaseErrorInterceptor.setHandler(function(error, actionCode) {
      if (error.code === 'PERMISSION_DENIED') {
        _managePermissionDenied(actionCode);
      } else {
        console.error('I see an error here : ' + actionCode + ' - ' + error.code);
      }
    });

    function _managePermissionDenied(actionCode) {
      growl.error('kct.layout.common.errors.permissions.' + actionCode);
    }
  }

})();
