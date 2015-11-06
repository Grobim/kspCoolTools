module.exports = function() {
  'use strict';

  var _config,
      glob = require('glob');

  _init();

  return {
    getConfig        : getConfig,
    mergeTasksConfig : mergeTasksConfig
  };

  function getConfig() {
    return _config;
  }

  function mergeTasksConfig() {
    var mergedConfig = {},
        taskDir = 'tasks';

    glob.sync('*.js', {
      cwd : taskDir
    }).forEach(function(taskFile) {
      var taskName = taskFile.replace(/\.js$/, '');

      // We need to pass require a relative path
      mergedConfig[taskName] = require('../' + taskDir + '/' + taskName);
    });

    return mergedConfig;
  }

  function _init() {
    _config = {
      app  : require('../bower.json').appPath || 'app',
      dist : 'dist'
    };
  }

};
