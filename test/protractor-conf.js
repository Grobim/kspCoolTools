(function() {
  'use strict';

  exports.config = {
    // location of the Selenium JAR file and chromedriver, use these if you installed protractor locally
    // seleniumServerJar: '../node_modules/protractor/selenium/selenium-server-standalone-2.47.1.jar',
    // chromeDriver: '../node_modules/protractor/selenium/chromedriver',
   
    // location of your E2E test specs
    specs: [
      'e2e/**/*.step.js'
    ],
   
    // configure multiple browsers to run tests
    multiCapabilities: [{
      'browserName' : 'chrome'
    }, {
      'browserName' : 'firefox'
    },  {
      'browserName' : 'internet explorer',
      'version'     : 10
    }],
    onPrepare: function() {
      return require(require('path').resolve(__dirname, 'e2e/utils.js'))().prepareFireBase();
    },
   
    // or configure a single browser
    /*
    capabilities: {
      'browserName': 'chrome'
    }
    */
   
    // url where your app is running, relative URLs are prepending with this URL
    baseUrl: 'http://localhost:9002/',
   
    // testing framework, jasmine is the default
    framework: 'jasmine2',
    seleniumArgs: ['-Dwebdriver.ie.driver=E:\\DevP\\MyGitRepos\\kspCoolTools\\node_modules\\protractor\\selenium\\IEDriverServer.exe']
  };
})();
