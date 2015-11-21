(function() {
  'use strict';

  angular.module('kct.components.fileUtils')
    .service('FileUtils', ['Upload', FileUtilsService])
  ;

  function FileUtilsService(Upload) {
    return {
      download  : download,
      getBase64 : getBase64
    };

    function download(file) {
      var element = document.createElement('a');
      element.setAttribute('href', file.content);
      element.setAttribute('download', file.name);
      element.setAttribute('target', '_blank');
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }

    function getBase64(file) {
      if (file) {
        return Upload.base64DataUrl(file);
      } else {
        return '';
      }
    }
  }

})();
