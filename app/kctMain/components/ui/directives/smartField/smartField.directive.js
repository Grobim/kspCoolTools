(function() {
  'use strict';

  angular.module('kct.components.ui.directives.smartField')
    .directive('smartField', [smartFieldDirective])
  ;

  function smartFieldDirective() {
    return {
      restrict : 'A',
      compile  : compile
    };

    function compile($element) {
      var _input = angular.element($element.find('input,select').get(0)),
          _config,
          _elementKey;

      if (!_input.length) {
        console.warn('no input');
        return;
      }

      _config = _makeConfig();

      if (!_.keys(_config).length) {
        console.warn('no validation');
        return;
      }

      _elementKey = _determineElementKey();

      if (!_elementKey || !_elementKey.length) {
        console.warn('couldn\'t determine key');
        return;
      }

      _injectMessages();

      return link;

      function _makeConfig() {
        var config = {};

        if (_input.attr('required') || _input.attr('ng-required')) {
          config.required = true;
        }

        if (_input.attr('ng-min-length') || _input.attr('maxlength') || _input.attr('ng-max-length')) {
          config.length = {
            min : _input.attr('ng-min-length'),
            max : _input.attr('maxlength') || _input.attr('ng-max-length')
          };
        }

        if (_input.attr('type') === 'email') {
          config.email = true;
        }

        if (_input.attr('type') === 'number' || _input.attr('min') || _input.attr('max')) {
          config.number = {
            min : _input.attr('min'),
            max : _input.attr('max')
          };
        }

        return config;
      }

      function _determineElementKey() {
        var _parentForms = _input.parents('form,[ng-form]'),
            _workKey = '';

        if (_parentForms.length) {
          angular.forEach(_parentForms, function(form) {
            var formEl = angular.element(form);
            _workKey = (formEl.attr('ng-form') || formEl.attr('name')) + '.' + _workKey;
          });
          return _workKey + _input.attr('name');
        } else {
          return null;
        }
      }

      function _injectMessages() {
        var _messagesTemplate = 
              '<div class="kct-smart-field-messages" ' +
                   'ng-messages="' + _elementKey + '.$error" ' +
                   'ng-show="' + _elementKey + '.$invalid && ' + _elementKey + '.$dirty" ' +
                   'role="alert">' +
              '</div>',
            _messagesEl = angular.element(_messagesTemplate);

        _input.after(_messagesEl);

        _.forOwn(_config, function(value, key) {
          var messageTemplate = '<div ng-message="' + key + '" class="kct-smart-field-message">' +
                                  '<span translate>kct.layout.common.errors.' + key + '</span>' +
                                '</div>';
          _messagesEl.append(angular.element(messageTemplate));
        });
      }

      function link(scope) {
        var parentDiv = angular.element(_input.parents('div').get(0)),
            cancel;

        cancel = scope.$watch(_elementKey + '.$invalid && ' + _elementKey + '.$dirty', function(newValue) {
          if (newValue && !parentDiv.hasClass('has-error')) {
            parentDiv.addClass('has-error');
          } else {
            parentDiv.removeClass('has-error');
          }
        });
        scope.$on('$destroy', function() {
          cancel();
        });
      }

    }

  }

})();
