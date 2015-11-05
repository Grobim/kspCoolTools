(function() {
  'use strict';

  angular.module('kct.directives.kctTable')
    .constant('kctTableConstants', {
      defaultTableSettings      : {
        query        : '',
        currentPage  : 1,
        itemsPerPage : 10,
        fillLastPage : true,
        order        : {
          predicate : ''
        }
      },
      defaultPaginationSettings : {
        rotate        : 'false',
        boundaryLinks : 'false',
        previousText  : '‹',
        nextText      : '›'
      },
      paginationTextFields      : {
        previousText : 'previousTextKey',
        nextText     : 'nextTextKey',
        firstText    : 'firstTextKey',
        lastText     : 'lastTextKey'
      }
    })
  ;  

})();
