(function() {
  'use strict';

  angular.module('kct.services.persistence.saveManager')
    .service('ModVersionDepsService', [
      '$state',
      '$stateParams',
      '$filter',
      '$q',
      '$firebaseObject',
      '$firebaseArray',
      'ModRef',
      'ModVersionRef',
      'ModVersionDepRef',
      'BiDirModVersionDepRef',
      ModVersionDepsService
    ])
  ;

  function ModVersionDepsService(
    $state,
    $stateParams,
    $filter,
    $q,
    $firebaseObject,
    $firebaseArray,
    ModRef,
    ModVersionRef,
    ModVersionDepRef,
    BiDirModVersionDepRef
  ) {
    return {
      addModTitleToDeps   : addModTitleToDeps,
      addModVersionDep    : addModVersionDep,
      editVersionDep      : editVersionDep,
      removeModVersionDep : removeModVersionDep
    };

    function addModTitleToDeps(modVersionDeps) {
      _.forEach(modVersionDeps, function(mod) {
        mod.title = ' ';
        var obj = $firebaseObject(new ModRef(mod.$id));
        obj.$watch(function() {
          mod.title = obj.title;
        });
      });
    }

    function addModVersionDep(newDependence) {
      var deferred = $q.defer(),
          existingModVersion;

      newDependence.minVersion = $filter('replaceChars')(newDependence.minVersion, '.', '_');

      existingModVersion = $firebaseObject(new ModVersionRef(newDependence.$id, newDependence.minVersion));
      existingModVersion.$loaded(function() {
        if (existingModVersion.$value === null) {
          existingModVersion.desc = '';
          existingModVersion.$save();
        }
      });

      newDependence.$save().then(function() {
        var biDirModVersion = _getVersionInfoFromDep(newDependence),
            diDirDep = $firebaseObject(
              new BiDirModVersionDepRef(
                newDependence.$id,
                newDependence.minVersion,
                biDirModVersion.modId
              )
            );

        diDirDep.$loaded(function() {
          diDirDep[biDirModVersion.modVersionId] = true;
          diDirDep.$save().then(function() {
            deferred.resolve();
          });
        });
      });
      return deferred.promise;
    }

    function editVersionDep(editedDependence) {
      var deferred = $q.defer();

      var actualDep = $firebaseObject(new ModVersionDepRef($stateParams.modId, $stateParams.modVersionId, editedDependence.$id));
      actualDep.$loaded(function() {
        editedDependence.minVersion = $filter('replaceChars')(editedDependence.minVersion, '.', '_');
        if (editedDependence.minVersion !== actualDep.minVersion) {
          removeModVersionDep(actualDep).then(addModVersionDep(editedDependence)).then(function() {
            deferred.resolve(true);
          });
        } else {
          editedDependence.$save().then(function() {
            deferred.resolve(false);
          });
        }
      });

      return deferred.promise;
    }

    function removeModVersionDep(removedDependence) {
      var deferredBiDirRemoved = $q.defer(),
          deferredRemoved = $q.defer(),
          biDirModVersion = _getVersionInfoFromDep(removedDependence),
          diDirDep = $firebaseObject(
            new BiDirModVersionDepRef(
              removedDependence.$id,
              removedDependence.minVersion,
              biDirModVersion.modId
            )
          )
      ;
      removedDependence.$remove().then(function() {
        deferredRemoved.resolve();
      });
      diDirDep.$loaded(function() {
        diDirDep[biDirModVersion.modVersionId] = null;
        diDirDep.$save().then(function() {
          deferredBiDirRemoved.resolve();
        });
      });
      return $q.all([deferredRemoved.promise, deferredBiDirRemoved.promise]);
    }

    function _getVersionInfoFromDep(newDependence) {
      var tempRef = newDependence.$ref().parent();

      return {
        modId        : tempRef.parent().key(),
        modVersionId : tempRef.key()
      };
    }

  }

})();
