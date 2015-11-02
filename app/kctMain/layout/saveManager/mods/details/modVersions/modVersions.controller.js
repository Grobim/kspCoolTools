(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details.modVersions')
    .controller('ModDetailsModVersionsController', ['$scope', '$stateParams', '$firebaseObject', '$firebaseArray', 'ModVersionsRef', 'ModRef', ModDetailsModVersionsController])
  ;

  function ModDetailsModVersionsController($scope, $stateParams, $firebaseObject, $firebaseArray, ModVersionsRef, ModRef) {
    var _this = this;

    init();

    function init() {
      _this.mod = $firebaseObject(new ModRef($stateParams.modId));
      _this.modVersions = $firebaseArray(new ModVersionsRef($stateParams.modId));
      _this.modVersions.$loaded(_initWatchers);

      _this.filteredModVersions = [];

      function _initWatchers() {

        $scope.$watchCollection('modVersionsCtrl.customQuery', function(newQuery) {
          if (newQuery && newQuery.length) {
            _this.filteredModVersions = _.filter(_this.modVersions, function(modVersion) {
              return (modVersion.$id.search(new RegExp(newQuery, 'i')) > -1) ||
                     (modVersion.desc.search(new RegExp(newQuery, 'i')) > -1);
            });
          } else {
            _this.filteredModVersions = _this.modVersions;
          }
        });

      }
    }

  }

})();
