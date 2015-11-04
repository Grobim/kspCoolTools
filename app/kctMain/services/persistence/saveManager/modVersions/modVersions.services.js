(function() {
  'use strict';

  angular.module('kct.services.persistence.saveManager')
    .service('ModVersionsService', [
      '$q',
      '$stateParams',
      '$firebaseArray',
      '$firebaseObject',
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
    $firebaseArray,
    $firebaseObject,
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

    function addDepLengthToVersions(modVersions) {
      _.forEach(modVersions, function(modVersion) {
        modVersion.depsLength = 0;
        var array = $firebaseArray(new ModVersionDepsRef($stateParams.modId, modVersion.$id));
        array.$watch(function () {
          modVersion.depsLength = array.length;
        });
      });
    }

    function deleteModVersion(modVersion) {
      var modId = modVersion.$ref().parent().key(),
          modVersionId = modVersion.$id,
          deferred = $q.defer();

      var biDirDeps = $firebaseObject(new BiDirModVersionDepsRef(modId, modVersionId));

      biDirDeps.$loaded(function() {
        if (biDirDeps.$value !== null) {
          deferred.reject('is dep');
        } else {
          var modVersionDelPromise = $q.defer(),
              modVersionDepsDelPromise = $q.defer();

          var array = $firebaseArray(new ModVersionDepsRef($stateParams.modId, $stateParams.modVersionId));

          array.$loaded(function() {
            angular.forEach(array, function(modVersionDep) {
              var modVersionDepObj = $firebaseObject(new ModVersionDepRef($stateParams.modId, $stateParams.modVersionId, modVersionDep.$id));
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
