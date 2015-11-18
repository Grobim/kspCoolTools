(function() {
  'use strict';

  angular.module('kct.components.interceptors')
    .run(['$firebaseErrorInterceptor', 'ToastService', angularFireInterceptor])
  ;

  function angularFireInterceptor($firebaseErrorInterceptor, ToastService) {
    $firebaseErrorInterceptor.setHandler(function(error, actionCode) {
      if (error.code === 'PERMISSION_DENIED') {
        if (actionCode) {
          _managePermissionDenied(actionCode);
        } else {
          console.error('I see an error here : ' + actionCode + ' - ' + error.code);
        }
      } else {
        console.error('I see an error here : ' + actionCode + ' - ' + error.code);
      }
    });

    function _managePermissionDenied(actionCode) {
      ToastService.error('kct.layout.common.errors.permissions.' + actionCode);
    }
  }

})();
