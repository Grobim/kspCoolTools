(function() {
  'use strict';

  angular.module('kct.directives.kctTable')
    .provider('kctTablePaginationConfig', ['kctTableConstants', KctTablePaginationConfigProvider])
  ;

  function KctTablePaginationConfigProvider(kctTableConstants) {
    var _this = this,
        _config = _.cloneDeep(kctTableConstants.defaultPaginationSettings);

    _this.get = get;
    _this.set = set;
    _this.$get = [KctTableConfig];

    function get() {
      return _config;
    }

    function set(config, value) {
      if (_.isPlainObject(config)) {
        _config = _.merge(_config, config);
      } else if (_.isString(config) && value) {
        _.set(_config, config, value);
      }
    }

    function KctTableConfig() {
      return {
        get : get
      };
    }
  }

})();
