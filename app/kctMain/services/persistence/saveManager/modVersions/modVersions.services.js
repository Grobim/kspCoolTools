(function() {
  'use strict';

  angular.module('kct.services.persistence.saveManager')
    .service('ModVersionsService', ['$stateParams', '$firebaseArray', 'ModVersionDepsRef', ModVersionsService])
  ;

  function ModVersionsService($stateParams, $firebaseArray, ModVersionDepsRef) {

    return {
      addDepLengthToVersions : addDepLengthToVersions
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
  }

})();
