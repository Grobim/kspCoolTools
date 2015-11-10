(function() {
  'use strict';

  angular.module('kct.components.persistence.saveManager')
    .service('ModsService', [
      '$q',
      '$intFirebaseArray',
      '$intFirebaseObject',
      'ModVersionRef',
      'ModVersionsRef',
      'ModVersionsService',
      'BiDirModDepsRef',
      ModsService
    ])
  ;

  function ModsService(
    $q,
    $intFirebaseArray,
    $intFirebaseObject,
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
      $intFirebaseArray(new BiDirModDepsRef(deletedMod.$id)).$loaded(function(modDeps) {

        if (modDeps.length) {
          deferred.reject(modDeps);
        } else {

          var modDelPromise = $q.defer(),
              modVersionsDelPromise = $q.defer();

          $intFirebaseArray(new ModVersionsRef(deletedMod.$id)).$loaded(function(versions) {

            _.forEach(versions, function(version) {
              $intFirebaseObject(new ModVersionRef(deletedMod.$id, version.$id)).$loaded(function(modVersion) {
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
