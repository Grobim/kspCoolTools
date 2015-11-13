// Automatically inject Bower components into the app
(function() {
  'use strict';

  module.exports = {
    options: {
      cwd: ''
    },
    app: {
      src: ['<%= yeoman.app %>/index.html'],
      ignorePath:  /\.\.\//,
      exclude : ['/bower_components/angular-material/angular-material.css']
    },
    test: {
      devDependencies: true,
      src: '<%= karma.unit.configFile %>',
      ignorePath:  /\.\.\//,
      fileTypes:{
        js: {
        block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
          detect: {
            js: /'(.*\.js)'/gi
          },
          replace: {
            js: '\'{{filePath}}\','
          }
        }
      }
    },
    sass: {
      src        : ['<%= yeoman.app %>/main.scss'],
      exclude    : [
        '/bower_components/bootstrap-sass-official/*'
      ]
    }
  };

})();
