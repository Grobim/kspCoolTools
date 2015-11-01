(function() {
  'use strict';

  angular.module('kct.directives.kctTable')
    .directive('kctTable', [KctTableDirective])
  ;

  function KctTableDirective() {
    return {
      restrict : 'A',
      scope    : true,
      compile  : compile
    };

    function compile(cElement, cAttrs) {
      console.log('compile', cElement, cAttrs);

      var _headElement = cElement.find('thead'),
          _bodyElement = cElement.find('tbody'),
          _tdElements = _bodyElement.find('td'),
          _columns = _extractColumns();

      _constructHeader();

      _constructBody();

      return {
        post : post
      };

      function post(pScope, pElement, pAttrs) {
        console.log('post', pScope, pElement, pAttrs);
      }

      function _extractColumns() {
        var columns = [];
        _tdElements.each(function(index, td) {
          var tdEl = angular.element(td),
              tableAttribute = tdEl.attr('kct-table-attribute'),
              column = {};
          // debugger;
          column.hasAttribute = !!tableAttribute;
          column.hasTitle = !!_headElement.find('tr th[kct-table-attribute=' + tableAttribute + ']').length;

          if (!column.hasTitle) {
            column.hasTitle = !!tdEl.attr('kct-table-title') || column.hasAttribute;
          }
          columns.push(column);
        });
        return columns;
      }

      function _constructHeader() {
        var rowHeader = _headElement.find('tr'),
            cacheRowHeader = rowHeader.clone();

        rowHeader.empty();

        _.forEach(_columns, function(column, index) {

          var relatedTd = angular.element(_tdElements[index]),
              appendedTh,
              attribute,
              foundTh;

          if (column.hasTitle) {

            if (column.hasAttribute) {
              attribute = relatedTd.attr('kct-table-attribute');
              foundTh = cacheRowHeader.find('th[kct-table-attribute=' + attribute + ']');
            }

            if (!!foundTh.length) {
              appendedTh = foundTh;
            } else {
              appendedTh = angular.element(document.createElement('th'));
              appendedTh.text(relatedTd.attr('kct-table-title') || _.capitalize(relatedTd.attr('kct-table-attribute')));
            }
          } else {
            appendedTh = angular.element(document.createElement('th'));
          }
          rowHeader.append(appendedTh);
        });

        return rowHeader;
      }

      function _constructBody() {
        _bodyElement.find('tr').attr('ng-repeat', 'item in ' + cAttrs.kctTableList);
      }
    }
  }

})();
