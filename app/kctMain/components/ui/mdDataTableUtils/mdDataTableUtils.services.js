(function() {
  'use strict';

  angular.module('kct.components.ui.mdDataTableUtils')
    .service('MdDataTableUtils', ['$filter', MdDataTableUtilsService])
  ;

  function MdDataTableUtilsService($filter) {
    return {
      onQueryChange : onQueryChange
    };

    function onQueryChange(list, tableConfig) {

      var workingList = list,
          from = (tableConfig.page - 1) * tableConfig.limit,
          to;
      // Filtering
      if (tableConfig.query && tableConfig.query.length) {
        workingList = $filter('filter')(workingList, tableConfig.query) || [];
      }

      if (_.isArray(workingList)) {
        tableConfig.totalItems = workingList.length;
      } else if (_.isObject(workingList)) {
        tableConfig.totalItems = _.size(workingList);
      } else {
        return list;
      }

      to = _.min([tableConfig.totalItems - 1, from + tableConfig.limit - 1]);


      // Sorting
      if (tableConfig.order.length) {
        var reverse = false,
            predicate = tableConfig.order;

        if (tableConfig.order.charAt(0) === '-') {
          reverse = true;
          predicate = _.trimLeft(predicate, '-');
        }
        workingList = $filter('orderBy')(workingList, predicate, reverse);
      }

      // Applying range
      workingList = _.take(workingList, to + 1);
      workingList = _.takeRight(workingList, to - from + 1);

      return workingList;

    }

  }

})();
