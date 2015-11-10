(function() {
  'use strict';

  function  TestController($firebaseObject, KctRootRef) {
    var _this = this;

    _this.test = 'Haha';
    _this.obj = $firebaseObject(KctRootRef.child('profiles').child('id2'));
  }

  angular.module('kct.mocks')
    .controller('TestController', ['$firebaseObject', 'KctRootRef', TestController])
  ;

})();
