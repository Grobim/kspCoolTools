
(function() {
  'use strict';

  describe('Layout', function() {

    beforeAll(function() {
      browser.ignoreSynchronization = true;
      browser.driver.manage().window().maximize();
    });

    it('should redirect to home when calling root url', function() {
      browser.get('/');
      expect(browser.getCurrentUrl()).toEqual(jasmine.stringMatching(/\/home$/));
      browser.get('/#/');
      expect(browser.getCurrentUrl()).toEqual(jasmine.stringMatching(/\/home$/));
    });

    it('should redirect to home when calling a wrong url', function() {
      browser.get('/#/aWrongUrl').then(function() {
        expect(browser.getCurrentUrl()).toEqual(jasmine.stringMatching(/\/home$/));
      });
    });

  });

})();
