// Generate locales settings
(function() {
  'use strict';

  module.exports = {
    options : {
      src       : '<%= yeoman.app %>/**/lang/',
      srcSuffix : '.json',
      dest      : '<%= yeoman.app %>/generated/langs/',
      prefix    : 'locale-',
      suffix    : '.json',
      langs     : [
        'fr',
        'en'
      ]
    }
  };

})();
