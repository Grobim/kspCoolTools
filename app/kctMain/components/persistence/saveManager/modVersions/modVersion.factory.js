(function() {
  'use strict';

  angular.module('kct.components.persistence.saveManager')
    .factory('ModVersionRef', [
      'ModVersionsRef',
      ModVersionRefFactory
    ])
    .factory('ModVersion', [
      '$firebaseUtils',
      '$filter',
      ModVersionF
    ])
    .factory('ModVersionFactory', [
      '$firebaseObject',
      '$filter',
      ModVersionFactory
    ])
    .factory('ModVersionsFactory', [
      '$firebaseArray',
      'ModVersion',
      ModVersionsFactory
    ])
  ;

  function ModVersionRefFactory(ModVersionsRef) {
    return function(modId, modsVersionId) {
      return new ModVersionsRef(modId).child(modsVersionId);
    };
  }

  function ModVersionF($firebaseUtils, $filter) {

    function ModVersion(snapshot) {
      this.$id = snapshot.key();
      this.update(snapshot);
    }

    ModVersion.prototype = {
      update : function(snapshot) {
        var oldData = _.extend({}, this.data);

        this.data = snapshot.val();
        this._id = $filter('replaceChars')(this.$id, '_', '.');

        return !angular.equals(this.data, oldData);
      },

      getId  : function() {
        return this._id;
      },

      toJSON : function() {
        return $firebaseUtils.toJSON(this.data);
      }
    };

    return ModVersion;
  }

  function ModVersionFactory($firebaseObject, $filter) {
    return $firebaseObject.$extend({
      getId : function() {
        return this._id;
      },
      $$updated : function() {
        var changed = $firebaseObject.prototype.$$updated.apply(this, arguments);

        this._id = $filter('replaceChars')(this.$id, '_', '.');

        return changed;
      }
    });
  }

  function ModVersionsFactory($firebaseArray, ModVersion) {
    return $firebaseArray.$extend({
      $$added   : function(snapshot) {
        return new ModVersion(snapshot);
      },
      $$updated : function(snapshot) {
        return this.$getRecord(snapshot.key()).update(snapshot);
      }
    });
  }

})();
