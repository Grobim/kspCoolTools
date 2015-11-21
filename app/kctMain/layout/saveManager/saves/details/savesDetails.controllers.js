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
      '$stateParams',
      '$intFirebaseObject',
      '$intFirebaseArray',
      'KctAuth',
      'SaveRef',
      'SavesRef',
      'SaveSaveFiles',
      'SaveSaveFile',
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
    $stateParams,
    $intFirebaseObject,
    $intFirebaseArray,
    KctAuth,
    SaveRef,
    SavesRef,
    SaveSaveFiles,
    SaveSaveFile,
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
        _this.save = {};
      } else {
        LoadingSpinner.loading('savesDetails');
        _this.save = $intFirebaseObject(new SaveRef($stateParams.saveId));
        _this.save.$loaded(function() {
          if (_this.save.fileName) {
            $intFirebaseObject(new SaveSaveFile(_this.save.fileName).child('name')).$loaded(function(data) {
              _this.saveFile = {
                name : data.$value
              };
              LoadingSpinner.loaded('savesDetails');
            });
          }
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
          }
        });
      }
    }

    function downloadTest() {
      FileUtils.download(_this.saveFile);
    }

    function clearSaveFile() {
      delete _this.saveFile.name;
    }

    function _createSave() {
      _this.save.author = KctAuth.$getAuth().uid;
      var saves = $intFirebaseArray(SavesRef);
      saves.$add(_this.save).then(function(saveRef) {

        if (_this.saveFile) {
          $intFirebaseArray(SaveSaveFiles).$add(_this.saveFile).then(function(saveFileRef) {
            var obj = saves.$getRecord(saveRef.key());
            obj.fileName = saveFileRef.key();
            saves.$save(obj);
          });
        }
      });
    }

    function _editSave() {
      _this.save.$save().then(function() {
        console.log('ok');
      }, function(err) {
        console.log(err);
      });
    }

  }

})();
