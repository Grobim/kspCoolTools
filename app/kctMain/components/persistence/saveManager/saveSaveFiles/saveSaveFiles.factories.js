(function() {
  'use strict';

  angular.module('kct.components.persistence.saveManager')
    .factory('SaveSaveFiles', ['SaveManagerRef', SaveSaveFilesFactory])
    .factory('SaveSaveFile', ['SaveSaveFiles', SaveSaveFileFactory])
  ;

  function SaveSaveFilesFactory(SaveManagerRef) {
      return SaveManagerRef.child('saveSaveFiles');
  }

  function SaveSaveFileFactory(SaveSaveFiles) {
    return function(fileSaveId) {
      return SaveSaveFiles.child(fileSaveId);
    };
  }

})();
