(function() {
  'use strict';

  angular.module('kct.services.persistence.saveManager')
    .service('ModsService', [
      '$q',
      '$firebaseArray',
      '$firebaseObject',
      'ModVersionRef',
      'ModVersionsRef',
      'ModVersionsService',
      'BiDirModDepsRef',
      ModsService
    ])
  ;

  function ModsService(
    $q,
    $firebaseArray,
    $firebaseObject,
    ModVersionRef,
    ModVersionsRef,
    ModVersionsService,
    BiDirModDepsRef
  ) {
    return {
      deleteMod : deleteMod
    };

    function deleteMod(deletedMod) {
      var deferred = $q.defer();
      $firebaseArray(new BiDirModDepsRef(deletedMod.$id)).$loaded(function(modDeps) {

        if (modDeps.length) {
          deferred.reject(modDeps);
        } else {

          var modDelPromise = $q.defer(),
              modVersionsDelPromise = $q.defer();

          $firebaseArray(new ModVersionsRef(deletedMod.$id)).$loaded(function(versions) {

            _.forEach(versions, function(version) {
              $firebaseObject(new ModVersionRef(deletedMod.$id, version.$id)).$loaded(function(modVersion) {
                ModVersionsService.deleteModVersion(modVersion);
              });
            });

            modVersionsDelPromise.resolve();
          });

          deletedMod.$remove().then(function() {
            modDelPromise.resolve();
          });

          $q.all([modDelPromise.promise, modVersionsDelPromise.promise]).then(function() {
            deferred.resolve();
          });

        }
      });

      return deferred.promise;
    }
  }

})();
