module.exports = function() {
  'use strict';

    return {
      waitForRouteChange : waitForRouteChange,
      prepareFireBase    : prepareFireBase
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

    function prepareFireBase() {
      var deferred = protractor.promise.defer(),
          Firebase = require('firebase'),
          data = require('./data'),
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

  };
