(function() {
  'use strict';

  angular.module('kct.layout.saveManager.saves.details')
    .controller('SavesDetailsMainController', [
      '$intFirebaseObject',
      '$stateParams',
      'SaveRef',
      'breadCrumbModelService',
      SavesDetailsMainController
    ])
    .controller('SaveDetailsController', [
      '$state',
      '$stateParams',
      '$intFirebaseObject',
      '$intFirebaseArray',
      'KctAuth',
      'SaveRef',
      'SavesRef',
      'SaveSaveFileRef',
      'SaveSaveFiles',
      'Upload',
      'FileUtils',
      'LoadingSpinner',
      'creationKey',
      SaveDetailsController
    ])
  ;

  function SavesDetailsMainController($intFirebaseObject, $stateParams, SaveRef, breadCrumbModelService) {

    breadCrumbModelService.value('save', $intFirebaseObject(new SaveRef($stateParams.saveId)));

  }

  function SaveDetailsController(
    $state,
    $stateParams,
    $intFirebaseObject,
    $intFirebaseArray,
    KctAuth,
    SaveRef,
    SavesRef,
    SaveSaveFileRef,
    SaveSaveFiles,
    Upload,
    FileUtils,
    LoadingSpinner,
    creationKey
  ) {

    var _this = this;

    _this.isCreation = isCreation;

    _this.formAction = (isCreation()) ? _createSave : _editSave;

    _this.getDetailsFlex = getDetailsFlex;
    _this.uploadSaveFile = uploadSaveFile;
    _this.clearSaveFile = clearSaveFile;

    _this.downloadTest = downloadTest;

    return init();

    function init() {

      if (isCreation()) {

        _this.save = {
          author : KctAuth.$getAuth().uid
        };

      } else {

        LoadingSpinner.loading('savesDetailsLoad');

        _this.save = $intFirebaseObject(new SaveRef($stateParams.saveId));
        _this.save.$loaded(function() {

          if (_this.save.saveFileId) {
            LoadingSpinner.loading('savesDetailsLoadFile');
            $intFirebaseObject(new SaveSaveFileRef(_this.save.saveFileId).child('name')).$loaded(function(data) {
              _this.saveFile = {
                name : data.$value
              };
              LoadingSpinner.loaded('savesDetailsLoadFile');
            });
          }

          LoadingSpinner.loaded('savesDetailsLoad');

        });

      }

    }

    function isCreation() {
      return $stateParams.saveId === creationKey;
    }

    function getDetailsFlex() {
      if (isCreation()) {
        return 70;
      } else {
        return '';
      }
    }

    function uploadSaveFile($files) {
      if ($files && $files.length) {
        var file = $files[0];
        FileUtils.getBase64(file).then(function(fileBase64) {
          if (fileBase64) {
            _this.saveFile = {
              name    : file.name,
              content : fileBase64
            };
            _this.fileChanged = true;
          }
        });
      }
    }

    function downloadTest() {
      if (LoadingSpinner.get('savesDetailsDownload')) {
        return;
      }

      LoadingSpinner.loading('savesDetailsDownload');
      $intFirebaseObject(new SaveSaveFileRef(_this.save.saveFileId)).$loaded(function(data) {
        _this.saveFile.content = FileUtils.fromParts(data.content);
        FileUtils.download(_this.saveFile).then(function() {
          LoadingSpinner.loaded('savesDetailsDownload');
        });
      });
    }

    function clearSaveFile() {
      _this.saveFile = null;
      _this.fileChanged = true;
    }

    function _createSave() {
      if (LoadingSpinner.get('savesDetailsSave')) {
        return;
      }
      LoadingSpinner.loading('savesDetailsSave');

      $intFirebaseArray(SavesRef).$add(_this.save).then(function(saveRef) {
        _this.save.$id = saveRef.key();
        if (_this.saveFile) {
          SaveSaveFiles.saveFile(_this.save, _this.saveFile).then(function() {
             _postCreate(saveRef.key());
          }, function(err) {
            console.log(err);
            LoadingSpinner.loaded('savesDetailsSave');
          });
        } else {
          _postCreate(saveRef.key());
        }
      });

      function _postCreate(saveKey) {
        LoadingSpinner.loaded('savesDetailsSave');
        $state.go('kct.saveManager.save.details', {saveId : saveKey});
      }
    }

    function _editSave() {
      if (LoadingSpinner.get('savesDetailsSave')) {
        return;
      }
      LoadingSpinner.loading('savesDetailsSave');

      _this.save.$save().then(function() {

        if (_this.fileChanged) {

          if (_this.saveFile) {
            SaveSaveFiles.saveFile(_this.save, _this.saveFile).then(function() {
              LoadingSpinner.loaded('savesDetailsSave');
              _this.fileChanged = false;
            }, function(err) {
              console.log(err);
              LoadingSpinner.loaded('savesDetailsSave');
            });
          } else {
            SaveSaveFiles.deleteFile(_this.save).then(function() {
              LoadingSpinner.loaded('savesDetailsSave');
              _this.fileChanged = false;
            }, function(err) {
              console.log(err);
              LoadingSpinner.loaded('savesDetailsSave');
            });
          }

        } else {
          LoadingSpinner.loaded('savesDetailsSave');
        }

      });
    }

  }

})();
