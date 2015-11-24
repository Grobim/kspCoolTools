(function() {
  'use strict';

  angular.module('kct.components.ui.formStateCheck')
    .service('FormStateCheckService', ['$state', 'DialogsService', FormStateCheckServiceFactory])
  ;

  function FormStateCheckServiceFactory($state, DialogsService) {
    return {
      addCheck : addCheck
    };

    function addCheck(scope, formName) {
      var cancelCheck = scope.$on('$stateChangeStart', stateChangeStartListener);

      scope.$on('$destroy', cancelCheck);

      function stateChangeStartListener(event, toState, toParams) {
        var form = scope.$eval(formName);
        if (form.$dirty) {
          DialogsService.stateChangeDialog().then(function() {
            form.$setPristine();
            $state.go(toState.name, toParams);
          });
          event.preventDefault();
        }

      }
    }
  }

})();
