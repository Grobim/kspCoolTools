(function() {
  'use strict';

  angular.module('kct.components.ui.dialogs')
    .controller('SimpleDialogController', ['$mdDialog', SimpleDialogControllerFactory])
  ;

  function SimpleDialogControllerFactory($mdDialog) {

    var _this = this;

    return init();

    function init() {

      _this.hide = $mdDialog.hide;
      _this.cancel = $mdDialog.cancel;

    }

  }

})();
