(function() {
  'use strict';

  angular.module('kct.components.persistence.saveManager')
    .service('SavesService', [
      '$q',
      '$intFirebaseObject',
      'SaveSaveFileRef',
      'ProfileRef',
      SavesService
    ])
  ;

  function SavesService(
    $q,
    $intFirebaseObject,
    SaveSaveFileRef,
    ProfileRef
  ) {

    return {
      addAuthorNameToSaves : addAuthorNameToSaves,
      addAuthorNameToSave  : addAuthorNameToSave,
      deleteSave           : deleteSave
    };

    function addAuthorNameToSaves(saves) {
      _.forEach(saves, addAuthorNameToSave);
    }

    function addAuthorNameToSave(save) {
      var authorName = $intFirebaseObject(new ProfileRef(save.author).child('nickname'));
      authorName.$watch(function() {
        save.$authorName = authorName.$value;
      });
    }

    function deleteSave(save) {
      return $q.all([
        (save.saveFileId) ? $intFirebaseObject(new SaveSaveFileRef(save.saveFileId)).$remove() : $q.resolve(),
        save.$remove()
      ]);
    }

  }

})();
