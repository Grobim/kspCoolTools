(function() {
  'use strict';

  angular.module('kct.components.ui.directives.kctTable')
    .directive('kctTable', ['$filter', '$injector', 'kctTableConstants', KctTableDirective])
  ;

  function KctTableDirective($filter, $injector, kctTableConstants) {
    var _defaultConfig = kctTableConstants.defaultTableSettings;
    return {
      restrict : 'A',
      scope    : true,
      compile  : compile
    };

    function compile(cElement) {
      var _headElement = cElement.find('thead'),
          _bodyElement = cElement.find('tbody'),
          _tdElements = _bodyElement.find('td'),
          _hasAngularTranslate = $injector.has('$translate'),
          _columns = _extractColumns();

      _constructHeader();

      _constructBody();

      return post;

      function post(pScope, pElement, pAttrs) {
        var _this = pScope.vm = {},
            _config,
            _list = pScope.$eval(pAttrs.kctTableList);

        _this.sortTable = sortTable;
        _this.showCaret = showCaret;
        _this.update = update;
        _this.fillArray = fillArray;

        init();

        function init() {
          var _effectiveConfig,
              _watcherCancels = [];
          if (!pScope.$eval(pAttrs.kctTableConfig)) {
            _effectiveConfig = _.cloneDeep(_defaultConfig);
          } else {
            _effectiveConfig = _.assign({}, _.cloneDeep(_defaultConfig), pScope.$eval(pAttrs.kctTableConfig));
            _effectiveConfig.currentPage = 1;
          }
          _.set(pScope, pAttrs.kctTableConfig, _effectiveConfig);
          _config = pScope.$eval(pAttrs.kctTableConfig);

          _initSorting();

          _this.filteredList = $filter('filter')(_list, _config.query);
          _this.fillerArray = [];

          _watcherCancels.push(pScope.$watchCollection(pAttrs.kctTableList, update));
          _watcherCancels.push(pScope.$watch(pAttrs.kctTableConfig + '.query', update));
          _watcherCancels.push(pScope.$watch(pAttrs.kctTableConfig + '.order.predicate', update));
          _watcherCancels.push(pScope.$watch(pAttrs.kctTableConfig + '.order.sortReverse', update));

          if (pAttrs.kctTablePaginated !== void 0) {
            _watcherCancels.push(pScope.$watch(pAttrs.kctTableConfig + '.currentPage', update));
            _watcherCancels.push(pScope.$watch(pAttrs.kctTableConfig + '.itemsPerPage', update));
          }

          function _initSorting() {
            var sortedColumn = _.find(_columns, 'initSorting');
            if (sortedColumn) {
              _config.order = {
                predicate   : sortedColumn.attribute,
                sortReverse : sortedColumn.initSorting === 'desc'
              };
            }
          }

        }

        function sortTable(predicate) {
          if (_config.order.predicate !== predicate) {
            _config.order.predicate = predicate;
            _config.order.sortReverse = false;
          } else {
            _config.order.sortReverse = !_config.order.sortReverse;
          }
        }

        function showCaret(predicate, sortReverse) {
          return _config.order.predicate === predicate && _config.order.sortReverse === sortReverse;
        }

        function update() {
          // Filtering
          _this.filteredList = _this.sortedList = $filter('filter')(pScope.$eval(pAttrs.kctTableList), _config.query) || [];
          _config.totalItems = _this.filteredList.length;

          // Deciding range
          var from = (_config.currentPage - 1) * _config.itemsPerPage,
              to = _.min([_this.filteredList.length - 1, from + _config.itemsPerPage - 1]);

          // Sorting
          if (_config.order.predicate.length) {
            _this.sortedList = $filter('orderBy')(_this.filteredList, _config.order.predicate, _config.order.sortReverse);
          }

          // Applying range
          _this.sortedList = _.take(_this.sortedList, to + 1);
          _this.sortedList = _.takeRight(_this.sortedList, to - from + 1);

          // Filling last page
          if (Math.max(1, Math.ceil(_this.filteredList.length / _config.itemsPerPage)) === _config.currentPage) {
            _this.fillerArray.length = 0;

            for (var i = 0; i < _config.itemsPerPage - _this.sortedList.length; ++i) {
              _this.fillerArray.push({});
            }

          } else {
            _this.fillerArray.length = 0;
          }

        }

        function fillArray() {
          return !!_config.fillLastPage;
        }
      }

      function _extractColumns() {
        var columns = [];
        _tdElements.each(function(index, td) {
          var tdEl = angular.element(td),
              column = {};

          column.attribute = tdEl.attr('kct-table-attribute');

          column.isSortable = tdEl.attr('kct-table-sortable') !== void 0 || !!/(sortable)/i.exec(tdEl.attr('class'));
          if (column.isSortable && column.attribute) {
            column.initSorting = tdEl.attr('kct-table-initial-sorting');
          }

          column.hasTitle = !!_headElement.find('tr th[kct-table-attribute=\'' + column.attribute + '\']').length;
          if (!column.hasTitle) {
            column.hasTitle = (!!tdEl.attr('kct-table-title-key') && _hasAngularTranslate) ||
                              !!tdEl.attr('kct-table-title') ||
                              !!column.attribute;
          }
          if (!!tdEl.attr('kct-table-title-key') && !_hasAngularTranslate) {
            console.warning('Couldn\'t find angular translate, using defaults');
          }
          columns.push(column);
        });
        return columns;
      }

      function _constructHeader() {
        var cacheRowHeader = _headElement.find('tr').clone(),
            rowHeader;

        if (_headElement.length) {

          rowHeader = angular.element(document.createElement('tr'));
          _headElement.empty().append(rowHeader);

          _.forEach(_columns, function(column, index) {

            var relatedTd = angular.element(_tdElements[index]),
                appendedTh,
                relatedTh = (column.hasTitle && column.attribute) ?
                                  cacheRowHeader.find('th[kct-table-attribute=' + escapeJquery(column.attribute) + ']') :
                                  null,
                tdTitleKey = relatedTd.attr('kct-table-title-key');

            if (column.hasTitle) {
              if (relatedTh && !!relatedTh.length) {
                appendedTh = relatedTh;
              } else {
                appendedTh = angular.element(document.createElement('th'));
                if (tdTitleKey && _hasAngularTranslate) {
                  appendedTh.append('<span translate>' + tdTitleKey + '</span>');
                } else {
                  appendedTh.text(relatedTd.attr('kct-table-title') || _.capitalize(relatedTd.attr('kct-table-attribute')));
                }
              }
            } else {
              appendedTh = angular.element(document.createElement('th'));
            }

            if (column.isSortable && column.attribute) {
              appendedTh.addClass('sortable-header');
              appendedTh.attr('ng-click', 'vm.sortTable(\'' + column.attribute + '\')');
              appendedTh.append('<span ng-show="vm.showCaret(\'' + column.attribute + '\', true)" class="glyphicon glyphicon-chevron-down pull-right"></span>');
              appendedTh.append('<span ng-show="vm.showCaret(\'' + column.attribute + '\', false)" class="glyphicon glyphicon-chevron-up pull-right"></span>');
            }

            rowHeader.append(appendedTh);
          });

        }
        function escapeJquery(input) {
          var output = input,
              escapedChars = ['$', '(', ')'];

          _.forEach(escapedChars, function(escapedChar) {
            output = output.split(escapedChar).join('\\' + escapedChar);
          });

          return output;
        }
      }

      function _constructBody() {
        _bodyElement.find('tr').attr('ng-repeat', 'item in vm.sortedList');

        var emptyTr = angular.element(document.createElement('tr'));
        emptyTr.attr('ng-repeat', 'filler in vm.fillerArray');
        emptyTr.attr('ng-if', 'vm.fillArray()');
        emptyTr.attr('class', 'filler');

        for (var i = 0; i < _columns.length; ++i) {
          emptyTr.append('<td><span>&nbsp;</span></td>');
        }

        _bodyElement.append(emptyTr);
      }
    }
  }

})();
