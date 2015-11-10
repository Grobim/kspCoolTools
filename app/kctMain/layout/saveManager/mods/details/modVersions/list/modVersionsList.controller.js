(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods.details.modVersions')
    .controller('ModDetailsModVersionsListController', [
      '$scope',
      '$stateParams',
      '$intFirebaseObject',
      '$intFirebaseArray',
      'ModVersionsRef',
      'ModRef',
      'ModVersionDepsRef',
      'ModVersionsService',
      'creationKey',
      ModDetailsModVersionsListController
    ])
  ;

  function ModDetailsModVersionsListController(
    $scope,
    $stateParams,
    $intFirebaseObject,
    $intFirebaseArray,
    ModVersionsRef,
    ModRef,
    ModVersionDepsRef,
    ModVersionsService,
    creationKey
  ) {
    var _this = this;

    init();

    function init() {
      _this.mod = $intFirebaseObject(new ModRef($stateParams.modId));
      _this.modVersions = $intFirebaseArray(new ModVersionsRef($stateParams.modId));
      _this.modVersions.$loaded(_initWatchers);
      _this.modVersions.$watch(function() {
        ModVersionsService.addDepLengthToVersions($stateParams.modId, _this.modVersions);
      });

      _this.tableConfig = {
        itemsPerPage : 5
      };

      _this.filteredModVersions = [];
      _this.creationKey = creationKey;

      function _initWatchers() {

        $scope.$watch('modVersionsListCtrl.customQuery', function(newQuery) {
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
