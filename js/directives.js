var carsDirectives = angular.module('carsDirectives', []);

var pattern = /[a-zA-Z]{2} [0-9]{4} [a-zA-Z]{2}/;

carsDirectives.directive('regNumber', function() {
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl) {
			ctrl.$validators.regNumber = function(modelValue, viewValue) {
				if(!modelValue) { 
					return true;
				}
				
				return pattern.test(modelValue);
			};
		}
	};
	
});

carsDirectives.directive('fileread', function() {
	return {
		scope: {
			fileread: "="
		},
		link: function(scope, element, attrs) {
			
			element.bind("change", function(changeEvent) {
				var reader = new FileReader();
				reader.onload = function(loadEvent) {
					scope.$apply(function() {
						scope.fileread = loadEvent.target.result;
					});
				};
				
				reader.readAsDataURL(changeEvent.target.files[0]);
			});
		}
	};
});