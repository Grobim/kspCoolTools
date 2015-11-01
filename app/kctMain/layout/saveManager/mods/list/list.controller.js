(function() {
  'use strict';

  angular.module('kct.layout.saveManager.mods')
    .controller('ModsController', ['$firebaseArray', '$filter', 'ModsRef', 'creationKey', ModsController])
  ;

  function ModsController($firebaseArray, $filter, ModsRef, creationKey) {
    var _this = this;

    _this.sortTable = sortTable;
    _this.showCaret = showCaret;
    _this.updateTable = updateTable;
    _this.creationKey = creationKey;

    init();

    function init() {
      _this.mods = $firebaseArray(ModsRef);

      _this.tableConfig = {
        currentPage  : 1,
        itemsPerPage : 10,
        query        : '',
        order        : {
          predicate : ''
        }
      };

      _this.mods.$loaded(function() {
        updateTable();
        _this.mods.$watch(updateTable);
      });
    }

    function sortTable(predicate) {
      if (_this.tableConfig.order.predicate !== predicate) {
        _this.tableConfig.order.predicate = predicate;
        _this.tableConfig.order.sortReverse = false;
      } else {
        _this.tableConfig.order.sortReverse = !_this.tableConfig.order.sortReverse;
      }
      updateTable();
    }

    function showCaret(predicate, sortReverse) {
      return _this.tableConfig.order.predicate === predicate && _this.tableConfig.order.sortReverse === sortReverse;
    }

    function updateTable() {
      // Filtering
      _this.filteredMods = $filter('filter')(_this.mods, _this.tableConfig.query);

      // Deciding range
      var from = (_this.tableConfig.currentPage - 1) * _this.tableConfig.itemsPerPage,
          to = _.min([_this.filteredMods.length - 1, from + _this.tableConfig.itemsPerPage - 1]);

      // Ordering
      if (_this.tableConfig.order.predicate.length) {
        _this.paginizedMods = $filter('orderBy')(_this.filteredMods, _this.tableConfig.order.predicate, _this.tableConfig.order.sortReverse);
      } else {
        _this.paginizedMods = _this.filteredMods;
      }

      // Applying range
      _this.paginizedMods = _.take(_this.paginizedMods, to + 1);
      _this.paginizedMods = _.takeRight(_this.paginizedMods, to - from + 1);
    }

  }

})();
