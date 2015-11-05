module.exports = function(grunt) {
  'use strict';

  var _        = require('lodash'),
      glob     = require('glob'),
      fs       = require('fs'),
      path     = require('path'),
      _exports = {
        generateLocales : generateLocales
      };

  return _exports;

  function generateLocales(options) {

    var _langs = options.langs || [];

    _.forEach(_langs, function(lang) {
      var _out = {};

      var _results = _matchLocales(lang);

      _results.forEach(_resultMerge);

      _saveContextLocaleFile(lang, _out, options);

      function _resultMerge(file) {
        _out = _.merge(_out, _parseLocaleFileContents(file));
      }
    });

    function _matchLocales(lang) {
      return glob.sync(options.src + lang + options.srcSuffix);
    }

    function _parseLocaleFileContents(filename){
      var contents = fs.readFileSync(path.resolve(filename), 'utf8');
      return JSON.parse(contents);
    }

    function _saveContextLocaleFile(lang, data, options) {
      var localeFilePath = path.resolve(path.join(
        options.cwd,
        options.dest,
        options.prefix + lang + options.suffix
      ));
      grunt.file.write(localeFilePath, JSON.stringify(data));
      console.log('Saved [' + lang + '] locale file to ' + localeFilePath);
    }

  }

};
