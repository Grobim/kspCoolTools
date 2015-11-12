(function() {
  'use strict';

  angular.module('kct.components.ui.directives.kctMenu')
    .factory('KctMenu', [
        KctMenuFactory
    ])
  ;

  function KctMenuFactory() {

    var self;
    return self = {

      toggleSelectSection: function (section) {
        self.openedSection = (self.openedSection === section ? null : section);
      },
      isSectionSelected: function (section) {
        return self.openedSection === section;
      }
    };

  }

})();
