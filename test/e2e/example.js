(function() {
  'use strict';

  describe('angularjs homepage todo list', function() {
    it('should add a todo', function() {
      browser.get('https://angularjs.org');

      element(by.model('todoList.todoText')).sendKeys('write first protractor test');
      element(by.css('[value="add"]')).click();

      var todoList = element.all(by.repeater('todo in todoList.todos'));
      expect(todoList.count()).toEqual(3);
      expect(todoList.get(2).getText()).toEqual('write first protractor test');

      // You wrote your first test, cross it off the list
      todoList.get(2).element(by.css('input')).click();
      var completedAmount = element.all(by.css('.done-true'));
      expect(completedAmount.count()).toEqual(2);
    });
  });

  describe('login w/ redirection', function() {

    var utils;

    beforeAll(function() {
      var path = require('path');
      utils = require(path.join(path.resolve('.'), 'test/e2e/utils.js'))();
      browser.ignoreSynchronization = true;
      browser.driver.manage().window().maximize();
    });

    it('test', function() {
      browser.get('/#/kct/xx/login');

      utils.waitForRouteChange(/\/login$/);

      element(by.model('loginCtrl.email')).sendKeys('test@test.fr');
      element(by.model('loginCtrl.pass')).sendKeys('test');
      element(by.css('form div button.btn-primary')).click();

      utils.waitForRouteChange(/\/home$/);

      browser.get('/#/kct/xx/profile');

      utils.waitForRouteChange(/\/profile$/);

      element(by.model('profileCtrl.profile.nickname')).getAttribute('value').then(function(text) {
        expect(text).toBe('TestTest');
      });
    });
  });

})();
