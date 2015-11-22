(function() {
  'use strict';

  angular.module('kct.components.persistence.saveManager')
    .factory('SaveSaveFilesRef', ['SaveManagerRef', SaveSaveFilesRefFactory])
    .factory('SaveSaveFileRef', ['SaveSaveFilesRef', SaveSaveFileRefFactory])
  ;

  function SaveSaveFilesRefFactory(SaveManagerRef) {
      return SaveManagerRef.child('saveSaveFiles');
  }

  function SaveSaveFileRefFactory(SaveSaveFilesRef) {
    return function(fileSaveId) {
      return SaveSaveFilesRef.child(fileSaveId);
    };
  }

})();
