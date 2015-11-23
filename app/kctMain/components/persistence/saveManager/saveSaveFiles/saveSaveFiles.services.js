(function() {
  'use strict';

  angular.module('kct.components.persistence.saveManager')
    .service('SaveSaveFiles', [
      '$q',
      '$intFirebaseArray',
      '$intFirebaseObject',
      'SavesRef',
      'SaveRef',
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
    SaveRef,
    SaveSaveFileRef,
    SaveSaveFilesRef,
    FileUtils
  ) {
    return {
      saveFile   : saveFile,
      copyFile   : copyFile,
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
          file.saveId = save.$id;
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

    function copyFile(fromSaveId, toSaveId) {

      var deferred = $q.defer();

      $intFirebaseObject(new SaveRef(fromSaveId).child('saveFileId')).$loaded(function(fromSaveFileId) {

        $intFirebaseObject(new SaveSaveFileRef(fromSaveFileId.$value)).$loaded(function(fromSaveFile) {

          $intFirebaseArray(SaveSaveFilesRef).$add({
            name    : fromSaveFile.name,
            saveId  : toSaveId,
            content : fromSaveFile.content
          }).then(function(newFileRef) {

            var newSave = $intFirebaseObject(new SaveRef(toSaveId));

            newSave.$loaded(function() {
              newSave.saveFileId = newFileRef.key();
              newSave.$save().then(deferred.resolve, deferred.reject);
            }, deferred.reject);

          }, deferred.reject);

        }, deferred.reject);

      }, deferred.reject);

      return deferred.promise;
    }

    function deleteFile(save) {
      var updatePromise = $q.defer();
      $intFirebaseObject(new SaveSaveFileRef(save.saveFileId)).$remove().then(function() {
        

        save.saveFileId = null;
        ((save.$save) ? save.$save() : $intFirebaseArray(SavesRef).$save(save)).then(function() {
          updatePromise.resolve();
        }, function(err) {
          updatePromise.reject(err);
        });
      }, function(err) {
        updatePromise.reject(err);
      });

      return updatePromise.promise;
    }

  }

})();
