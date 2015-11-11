(function() {
  'use strict';

  ngDescribe({
    modules : [
      'kct.mocks',
      'kct.mocks.data'
    ],
    element : '<div ng-controller="TestController as testCtrl"></div>',
    inject  : ['KctRootRef', '$firebaseObject'],
    tests   : testsFunc
  });

  function testsFunc(deps) {

    describe('TestController', function () {

      var ctrl;

      beforeEach(function() {
        ctrl = deps.element.controller();
      });

      it('should fetch data with firebase', function () {

        deps.KctRootRef.child('profiles').once('value', function(snap) {
          la(typeof snap.val().id2.nickname !== 'undefined', snap.val().id2, 'should have a nickname');
        });
        deps.KctRootRef.flush();

      });

      it('should fetch data with angularFire (and test from controller)', function () {

        var obj = deps.$firebaseObject(deps.KctRootRef.child('profiles').child('id2'));

        deps.KctRootRef.flush();
        deps.step();

        la(ctrl.obj.nickname !== undefined, ctrl.obj, 'should have a nickname');
        la(ctrl.obj.nickname === obj.nickname, ctrl.obj, 'should have the same nickname than', obj);

      });

    });

  }

})();
