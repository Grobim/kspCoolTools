(function() {
  'use strict';

  angular.module('kct.components.persistence.saveManager')
    .service('SaveSaveFiles', [
      '$q',
      '$intFirebaseArray',
      '$intFirebaseObject',
      'SavesRef',
      'SaveSaveFileRef',
      'SaveSaveFilesRef',
      'FileUtils',
      SaveSaveFilesService
    ])
  ;

  function SaveSaveFilesService(
    $q,
    $intFirebaseArray,
    $intFirebaseObject,
    SavesRef,
    SaveSaveFileRef,
    SaveSaveFilesRef,
    FileUtils
  ) {
    return {
      saveFile   : saveFile,
      deleteFile : deleteFile
    };

    function saveFile(save, file) {
      var deferred = $q.defer(),
          saves = $intFirebaseArray(SavesRef),
          saveObj;

      saves.$loaded(function() {
        saveObj = saves.$getRecord(save.$id);

        if (save.saveFileId) {
          deleteFile(save).then(_save, function(err) {
            deferred.reject(err);
          });
        } else {
          _save();
        }

        function _save() {
          file.content = FileUtils.toParts(file.content);
          $intFirebaseArray(SaveSaveFilesRef).$add(file).then(function(fileRef) {
            saveObj.saveFileId = fileRef.key();

            saves.$save(saveObj).then(function() {
              deferred.resolve();
            }, function(err) {
              deferred.reject(err);
            });

          }, function (err) {
            deferred.reject(err);
          });
        }

      }, function(err) {
        deferred.reject(err);
      });

      return deferred.promise;
    }

    function deleteFile(save) {
      var deletePromose = $intFirebaseObject(new SaveSaveFileRef(save.saveFileId)).$remove(),
          updatePromise;

      save.saveFileId = null;
      updatePromise = (save.$save) ? save.$save() : $intFirebaseArray(SavesRef).$save(save);

      return $q.all([
        updatePromise,
        deletePromose
      ]);
    }

  }

})();
