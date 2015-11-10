(function(){
  'use strict';

  describe('TestController', function () {

      var rootScope, ctrl, ref, $firebaseObject;

      beforeEach(function() {

        module('kct.mocks');
        module('kct.mocks.data');

        inject(function($injector) {

          ref = $injector.get('KctRootRef');
          $firebaseObject = $injector.get('$firebaseObject');
          rootScope = $injector.get('$rootScope');
          ctrl = $injector.get('$controller')('TestController as testCtrl', {
            $scope : rootScope.$new()
          });

        });

      });

      it('should fetch data with firebase', function () {

        ref.child('profiles').once('value', function(snap) {
          expect(snap.val().id3.nickname).toBeDefined();
        });

      });

      it('should fetch data with angularFire (and test from controller)', function () {

        var obj = $firebaseObject(ref.child('profiles').child('id2'));

        ref.flush();
        rootScope.$digest();

        expect(ctrl.obj.nickname).toBe(obj.nickname);

      });

  });

})();
