(function() {
  'use strict';

  ngDescribe({
    name    : 'ProfilesService',
    modules : ['kct.mocks', 'kct.mocks.data', 'kct.profiles'],
    inject  : ['KctRootRef', 'ProfilesService'],
    tests   : testsFunc
  });

  function testsFunc(deps) {

    describe('Definiton', function() {

      it('should be defined', function() {

        la(deps.ProfilesService !== undefined);

      });

      it('should be able to create a profile', function() {

        la(deps.ProfilesService.createProfile !== undefined);

      });

    });

    describe('createProfile', function() {

      var profileData,
          profileRef,
          provilePrivateInfoRef;

      beforeEach(function() {

        profileData = {
          public  : {
            nickname : 'TestNickname'
          },
          private : {
            email : 'TestEmail'
          }
        };
        profileRef = deps.KctRootRef.child('profiles').child('testId');
        provilePrivateInfoRef = deps.KctRootRef.child('profilePrivateInfos').child('testId');

      });

      it('should create a profile with public and private data', function() {

        deps.ProfilesService.createProfile('testId', profileData);

        profileRef.once('value', function(snap) {

          la(_.isEqual(snap.val(), profileData.public));

        });

        provilePrivateInfoRef.once('value', function(snap) {

          la(_.isEqual(snap.val(), profileData.private));

        });

        deps.KctRootRef.flush();
        deps.step();

      });

      it('should create a profile with public', function() {

        delete profileData.private;

        deps.ProfilesService.createProfile('testId', profileData);

        profileRef.once('value', function(snap) {
          la(_.isEqual(snap.val(), profileData.public));
        });

        provilePrivateInfoRef.once('value', function(snap) {
          la(snap.val() === null);
        });

        deps.KctRootRef.flush();

      });

      it('should throw when no public data provided and not save anything', function() {

        delete profileData.public;

        expect(function() {
          deps.ProfilesService.createProfile('testId', profileData);
        }).toThrow();

        profileRef.once('value', function(snap) {
          la(snap.val() === null);
        });

        provilePrivateInfoRef.once('value', function(snap) {
          la(snap.val() === null);
        });

        deps.KctRootRef.flush();

      });

      it('sould resolve a promise', function() {

        var wrapper = {spy: _.noop};

        spyOn(wrapper, 'spy');

        deps.ProfilesService.createProfile('testId', profileData).then(wrapper.spy);

        deps.KctRootRef.flush();
        deps.step();

        expect(wrapper.spy).toHaveBeenCalled();
        la(wrapper.spy.calls.count() === 1);

      });

    });

  }

})();
