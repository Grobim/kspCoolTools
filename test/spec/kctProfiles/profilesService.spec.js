(function() {
  'use strict';

  describe('ProfilesService', function() {

    var rootRef, service;

    beforeEach(function() {

      module('kct.mocks');
      module('kct.mocks.data');
      module('kct.profiles');

      inject(function($injector) {

        rootRef = $injector.get('KctRootRef');
        service = $injector.get('ProfilesService');

      });

    });

    describe('Definiton', function() {

      it('should be defined', function() {

        expect(service).toBeDefined();

      });

      it('should be abble to create a profile', function() {

        expect(service.createProfile).toBeDefined();

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
        profileRef = rootRef.child('profiles').child('testId');
        provilePrivateInfoRef = rootRef.child('profilePrivateInfos').child('testId');

      });

      it('should create a profile with public and private data', function() {

        service.createProfile('testId', profileData);

        profileRef.once('value', function(snap) {
          expect(snap.val()).toEqual(profileData.public);
        });

        provilePrivateInfoRef.once('value', function(snap) {
          expect(snap.val()).toEqual(profileData.private);
        });

        rootRef.flush();

      });

      it('should create a profile with public', function() {

        delete profileData.private;

        service.createProfile('testId', profileData);

        profileRef.once('value', function(snap) {
          expect(snap.val()).toEqual(profileData.public);
        });

        provilePrivateInfoRef.once('value', function(snap) {
          expect(snap.val()).toBeNull();
        });

        rootRef.flush();

      });

      it('should throw when no public data provided', function() {

        delete profileData.public;

        expect(function() {
          service.createProfile('testId', profileData);
        }).toThrow();

        profileRef.once('value', function(snap) {
          expect(snap.val()).toBeNull();
        });

        provilePrivateInfoRef.once('value', function(snap) {
          expect(snap.val()).toBeNull();
        });

        rootRef.flush();

      });

    });

  });

})();
