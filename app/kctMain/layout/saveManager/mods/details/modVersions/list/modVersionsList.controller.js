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
      'MdDataTableUtils',
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
    MdDataTableUtils,
    creationKey
  ) {
    var _this = this;

    _this.onQueryChange = onQueryChange;

    return init();

    function init() {

      _this.tableConfig = {
        order: '-title',
        limit: 10,
        page: 1
      };

      _this.mod = $intFirebaseObject(new ModRef($stateParams.modId));

      _this.modVersions = $intFirebaseArray(new ModVersionsRef($stateParams.modId));
      _this.modVersions.$loaded(_initWatchers);
      _this.modVersions.$loaded(onQueryChange);
      _this.modVersions.$watch(function() {
        ModVersionsService.addDepLengthToVersions($stateParams.modId, _this.modVersions);
      });

      _this.filteredModVersions = _this.modVersions;
      _this.creationKey = creationKey;

      function _initWatchers() {

        $scope.$watch('modVersionsListCtrl.customQuery', function(newQuery) {
          if (newQuery && newQuery.length) {
            _this.filteredModVersions = _.filter(_this.modVersions, function(modVersion) {
              return (modVersion.$id.search(new RegExp(newQuery, 'i')) > -1);
            });
          } else {
            _this.filteredModVersions = _this.modVersions;
          }
          onQueryChange();
        });

      }
    }

    function onQueryChange() {
      _this.tableModVersions = MdDataTableUtils.onQueryChange(_this.filteredModVersions, _this.tableConfig);
    }

  }

})();
