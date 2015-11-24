(function() {
  'use strict';

  angular.module('kct.components.ui.dialogs')
    .service('DialogsService', ['$mdDialog', DialogsServiceFactory])
  ;

  function DialogsServiceFactory($mdDialog) {
    return {
      stateChangeDialog : stateChangeDialog
    };

    function stateChangeDialog() {
      return $mdDialog.show({
        templateUrl         : 'kctMain/components/ui/dialogs/templates/stateChange.tpl.html',
        controller          : 'SimpleDialogController',
        controllerAs        : 'dialog',
        parent              : angular.element(document.body),
        clickOutsideToClose : true
      });
    }
  }

})();
