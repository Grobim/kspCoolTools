(function() {
  'use strict';

  angular.module('kct.services.persistence.saveManager')
    .service('ModVersionDepsService', ['$stateParams', '$firebaseObject', 'ModRef', ModVersionDepsService])
  ;

  function ModVersionDepsService($stateParams, $firebaseObject, ModRef) {
    return {
      addModTitleToDeps : addModTitleToDeps
    };

    function addModTitleToDeps(modVersionDeps) {
      _.forEach(modVersionDeps, function(mod) {
        mod.title = '';
        var obj = $firebaseObject(new ModRef(mod.$id));
        obj.$watch(function() {
          mod.title = obj.title;
        });
      });
    }

  }

})();
