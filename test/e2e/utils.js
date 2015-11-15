module.exports = function() {
  'use strict';

    return {
      waitForRouteChange : waitForRouteChange
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
  };
