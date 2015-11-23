(function() {
  'use strict';

  angular.module('kct.layout')
    .run([
      '$rootScope',
      '$state',
      'KctAuth',
      'ToastService',
      LoginRouteInterceptor
    ])
  ;

  function LoginRouteInterceptor(
    $rootScope,
    $state,
    KctAuth,
    ToastService
  ) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {

      if (_.isBoolean(toState.data.requireAuth)) {
        if (_.isObject(KctAuth.$getAuth()) !== toState.data.requireAuth) {
          event.preventDefault();

          if (toState.data.requireAuth) {
            ToastService.error('kct.layout.common.errors.rooting.requireAuth');
          } else {
            ToastService.error('kct.layout.common.errors.rooting.requireUnauth');
          }
          if (!fromState.name || !fromState.name.length) {
            $state.go('kct.home');
          }
        }

      }

    });

    KctAuth.$onAuth(function(auth) {
      if (
        $state.current &&
        $state.current.name !== 'kct.login' &&
        $state.current.data &&
        _.isBoolean($state.current.data.requireAuth) &&
        _.isObject(auth) !== $state.current.data.requireAuth
      ) {
        if ($state.current.data.requireAuth) {
          ToastService.error('kct.layout.common.errors.rooting.requireAuth');
          $state.go('kct.home');
        } else {
          ToastService.error('kct.layout.common.errors.rooting.requireUnauth');
          $state.go('kct.home');
        }
        $rootScope.$emit('requireAuthPageError');
      }
    });
  }

})();
