(function() {
  'use strict';

  angular.module('kct.components.fileUtils')
    .service('FileUtils', ['$q',  'Upload', FileUtilsService])
  ;

  function FileUtilsService($q, Upload) {
    return {
      download  : download,
      getBase64 : getBase64,
      toParts   : toParts,
      fromParts : fromParts
    };

    function download(file) {
      var deferred = $q.defer();
      if (file.content.slice(0, 100).indexOf('data:image') === 0) {
        var element = document.createElement('a');
        element.setAttribute('href', file.content);
        element.setAttribute('download', file.name);
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        deferred.resolve(file.name);
      } else {
        saveAs(new Blob([atob(file.content.slice(file.content.indexOf('base64,') + 7))]), file.name);
        deferred.resolve(file.name);
      }
      return deferred.promise;
    }

    function getBase64(file) {
      if (file) {
        return Upload.base64DataUrl(file);
      } else {
        return $q.resolve('');
      }
    }

    function toParts(fileContent) {
      var limit = 10485760,
          out = {},
          workingFile = fileContent,
          index;

      for (index = 1; workingFile.length > 0; ++index) {
        out['part-' + index] = workingFile.slice(0, limit);
        workingFile = workingFile.slice(limit);
      }

      return out;
    }

    function fromParts(fileParts) {
      var out = '';

      _.forOwn(fileParts, function(obj) {
        out = out + obj;
      });

      return out;
    }

  }

})();
