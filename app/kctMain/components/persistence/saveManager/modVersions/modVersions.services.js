(function() {
  'use strict';

  angular.module('kct.components.persistence.saveManager')
    .service('ModVersionsService', [
      '$q',
      '$stateParams',
      '$intFirebaseArray',
      '$intFirebaseObject',
      'ModVersionRef',
      'ModVersionDepRef',
      'ModVersionDepsRef',
      'BiDirModVersionDepsRef',
      'ModVersionDepsService',
      ModVersionsService
    ])
  ;

  function ModVersionsService(
    $q,
    $stateParams,
    $intFirebaseArray,
    $intFirebaseObject,
    ModVersionRef,
    ModVersionDepRef,
    ModVersionDepsRef,
    BiDirModVersionDepsRef,
    ModVersionDepsService
  ) {

    return {
      addDepLengthToVersions : addDepLengthToVersions,
      deleteModVersion       : deleteModVersion
    };

    function addDepLengthToVersions(modId, modVersions) {
      _.forEach(modVersions, function(modVersion) {
        modVersion.depsLength = 0;
        var array = $intFirebaseArray(new ModVersionDepsRef(modId, modVersion.$id));
        array.$watch(function () {
          modVersion.depsLength = array.length;
        });
      });
    }

    function deleteModVersion(modVersion) {
      var modId = modVersion.$ref().parent().key(),
          modVersionId = modVersion.$id,
          deferred = $q.defer();

      $intFirebaseObject(new BiDirModVersionDepsRef(modId, modVersionId)).$loaded(function(biDirDeps) {

        if (biDirDeps.$value !== null) {
          deferred.reject(biDirDeps);
        } else {

          var modVersionDelPromise = $q.defer(),
              modVersionDepsDelPromise = $q.defer();

          $intFirebaseArray(new ModVersionDepsRef(modId, modVersionId)).$loaded(function(array) {

            _.forEach(array, function(modVersionDep) {
              var modVersionDepObj = $intFirebaseObject(new ModVersionDepRef(modId, modVersionId, modVersionDep.$id));
              modVersionDepObj.$loaded(function() {
                ModVersionDepsService.removeModVersionDep(modVersionDepObj);
              });
            });

            modVersionDepsDelPromise.resolve();
          });

          modVersion.$remove().then(function() {
            modVersionDelPromise.resolve();
          });

          $q.all([modVersionDelPromise.promise, modVersionDepsDelPromise.promise]).then(function() {
            deferred.resolve();
          });
        }
      });

      return deferred.promise;
    }
  }

})();
