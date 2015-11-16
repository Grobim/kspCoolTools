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

      global.waitForRouteChange = waitForRouteChange;

      return _prepareFireBase();
    },
   
    // or configure a single browser
    /*
    capabilities: {
      'browserName': 'chrome'
    }
    */
   
    // url where your app is running, relative URLs are prepending with this URL
    baseUrl: 'http://localhost:9000/',
   
    // testing framework, jasmine is the default
    framework: 'jasmine2',
    seleniumArgs: ['-Dwebdriver.ie.driver=E:\\DevP\\MyGitRepos\\kspCoolTools\\node_modules\\protractor\\selenium\\IEDriverServer.exe']
  };

  function waitForRouteChange(urlRegex) {
    var currentUrl;

    return browser.getCurrentUrl().then(function storeCurrentUrl(url) {
            currentUrl = url;
        }
    ).then(function waitForUrlToChangeTo() {
            return browser.wait(function waitForUrlToChangeTo() {
                return browser.getCurrentUrl().then(function compareCurrentUrl(url) {
                    return urlRegex.test(url);
                });
            }, 10000);
        }
    );
  }

  function _prepareFireBase() {
    var deferred = protractor.promise.defer(),
        Firebase = require('firebase'),
        data = require('./e2e/data'),
        ref = new Firebase('https://ksp-cool-tools-test.firebaseio.com/');

    ref.authWithPassword({email : 'test@test.fr', password: 'test'}, function(authError){
      if (authError) {
        deferred.reject('connection error');
        ref.unauth();
      } else {
        ref.set(data, function(error) {
          if (error) {
            deferred.reject('save error');
          } else {
            deferred.fulfill();
          }
          ref.unauth();
        });
      }
    });
    
    return deferred.promise;
  }
})();
