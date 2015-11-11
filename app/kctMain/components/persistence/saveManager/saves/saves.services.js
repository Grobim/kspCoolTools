(function() {
  'use strict';

  angular.module('kct.components.persistence.saveManager')
    .service('SavesService', ['$intFirebaseObject', 'ProfileRef', SavesService])
  ;

  function SavesService($intFirebaseObject, ProfileRef) {

    return {
      addAuthorNameToSaves : addAuthorNameToSaves
    };

    function addAuthorNameToSaves(saves) {
      _.forEach(saves, function(save) {
        var profile = $intFirebaseObject(new ProfileRef(save.author));
        profile.$watch(watcher);

        function watcher() {
          save.$authorName = profile.nickname;
        }
      });
    }

  }

})();
