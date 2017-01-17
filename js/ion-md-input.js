angular.module('ionMdInput', [])

.directive('ionMdInput', function() {
  return {
    restrict: 'E',
    replace: true,
    require: '?ngModel',
    template: '<label class="item item-input item-md-label">' +
      '<input type="text" class="md-input">' +
      '<span class="input-label"></span>' +
      '<div class="highlight"></div>' +
      '</label>',
    compile: function(element, attr) {

      var highlight = element[0].querySelector('.highlight');
      var highlightColor;
      if (!attr.highlightColor) {
        highlightColor = 'calm';
      } else {
        highlightColor = attr.highlightColor;
      }
      highlight.className += ' highlight-' + highlightColor;

      var label = element[0].querySelector('.input-label');
      label.innerHTML = attr.placeholder;

      /*Start From here*/
      var input = element.find('input');
      angular.forEach({
        'name': attr.name,
        'type': attr.type,
        'ng-value': attr.ngValue,
        'ng-model': attr.ngModel,
        'required': attr.required,
        'ng-required': attr.ngRequired,
        'ng-minlength': attr.ngMinlength,
        'ng-maxlength': attr.ngMaxlength,
        'ng-pattern': attr.ngPattern,
        'ng-change': attr.ngChange,
        'ng-trim': attr.trim,
        'ng-blur': attr.ngBlur,
        'ng-focus': attr.ngFocus,
        'ui-mask' : attr.mask,
        'ng-pattern' : attr.ngPattern,
        'ng-class' : attr.ngClass,
      }, function(value, name) {
        if (angular.isDefined(value)) {
          input.attr(name, value);
        }
      });

      var cleanUp = function() {
        ionic.off('$destroy', cleanUp, element[0]);
      };
      // add listener
      ionic.on('$destroy', cleanUp, element[0]);

      return function LinkingFunction($scope, $element) {

        var mdInput = $element[0].querySelector('.md-input');

        var dirtyClass = 'used';

        var reg = new RegExp('(\\s|^)' + dirtyClass + '(\\s|$)');

        //Here is our toggle function
        var toggleClass = function() {
          if (this.value === '') {
            this.className = mdInput.className.replace(reg, ' ');
          } else {
            this.classList.add(dirtyClass);
          }
        };

        //Lets check if there is a value on load
        $scope.$watch(attr.ngModel,function(newValue, oldValue){
          console.log(newValue);
          if(!(newValue === '' || newValue == null)){
            mdInput.classList.add(dirtyClass);
          }
        }, true);
        ionic.DomUtil.ready(function() {
          
          if (mdInput.value === '' ) {
            mdInput.className = mdInput.className.replace(reg, ' ');
          } 
          mdInput.value = ''
        });
        // Here we are saying, on 'blur', call toggleClass, on mdInput
        ionic.on('blur', toggleClass, mdInput);

      };

    }
  };
});
