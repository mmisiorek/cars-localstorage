var carsCtrls = angular.module('carsControllers', ['carsDirectives', 'google-maps'.ns()]);

carsCtrls.controller('DisplayCarCtrl', ['$scope', '$routeParams', 'Database', function($scope, $routeParams, Database) {
	$scope.car = Database.getObject('car', $routeParams.id);
	
	$scope.pageTitle = "Details of car #"+(parseInt($routeParams.id)+1);
	
	$scope.map = {
		center: {
			latitude: ($scope.car.location.latitude.dir == "N" ? 1 : -1)*($scope.car.location.latitude.val),
			longitude: ($scope.car.location.longitude.dir == 'E' ? 1 : -1)*$scope.car.location.longitude.val
		},
		zoom: 8
	};
}]);

carsCtrls.controller('ListCarsCtrl', ['$scope', '$location', '$modal', 'Database', function($scope, $location, $modal, Database) {
	$scope.$parent.active = { list: true };
	
	$scope.cars = Database.getAllObjects('car');
	
	$scope.predicate = "id";
	$scope.reverse = false;
	
	$scope.sort = function(field, btn_id) {
		if($scope.predicate == field) {
			$scope.reverse = !$scope.reverse;
			
			var el = angular.element(document.querySelector("#"+btn_id+" .sort-dir"));
			if( el.length ) {
				var sign = ($scope.reverse ? "&or;" : "&and;");
				
				el[0].innerHTML = sign;
			}
		}
		else {
			$scope.reverse = false;
			
			var els = angular.element(document.querySelector(".sort-dir"));
			angular.forEach(els, function(el) {
				el.parentNode.removeChild(el);
			});
			
			var el = angular.element(document.querySelector("#"+btn_id+" .sort-dir"));
			el[0].innerHTML = "&and;";
		}
		
		$scope.predicate = field;
	};
	
	$scope.goToDetails = function(id) {
		$scope.$parent.active = {};
		$location.path('/details/'+id);
	};
	
	$scope.goToEdit = function(id) {
		$scope.$parent.active = {};
		$location.path('/edit/'+id);
	};
	
	$scope.removeCar = function(id) {
		var modalInstance = $modal.open({
			templateUrl: 'partials/modals/carRemoval.html',
			controller: 'CarRemovalModalCtrl'
		});
		
		modalInstance.result.then(function() {
			Database.removeObject('car', id);
			$scope.cars = Database.getAllObjects('car');
			
		}, function(){});
	};
}]);

/* form controlllers */

var formCtrl = function($scope, $location, $modal, Database, car) {
	if(car !== undefined) {
		$scope.car = car;
	}
	
	$scope.brands = ['Ford', 'Seat', 'Volkswagen', 'Skoda', 'Renault', 'Lada'];
	
	$scope.modernizr = {
		inputdate: Modernizr.inputtypes.date	
	};
	
	if(!$scope.modernizr.inputdate) {
		$scope.datepickerOpened = false;
		
		$scope.datepickerOpen = function($event) {
			$scope.datepickerOpened = true;
		};
	}
	else {
		if($scope.car && $scope.car.date) {
			$scope.car.date = new Date($scope.car.date.substr(0,10));
		}
	}
	
	$scope.submitForm = function(form) {
		if(parseInt($scope.car.available) == 1) {
			$scope.car.available = true;
		}
		else {
			$scope.car.available = false;
		}
		
		Database.persistObject('car', $scope.car);
		
		var modalInstance = $modal.open({
			templateUrl: 'partials/modals/changesSaved.html',
			controller: 'ChangesSavedModalCtrl'
		});
		
		modalInstance.result.then(function() {
			$location.path("/");
			
		}, function() {});
	};
	
	$scope.locationFieldHasError = function(form, type) {
		return (form[type].$invalid && form[type].$touched) || (form[type+"Dir"].$invalid && form[type+"Dir"].$touched);
	};
};

carsCtrls.controller('NewCarCtrl', ['$scope', '$location', '$modal', 'Database', function($scope, $location, $modal, Database) {
	$scope.pageTitle = "Add a new car";
	$scope.$parent.active = { add: true };
	
	formCtrl($scope, $location, $modal, Database);
}]);

carsCtrls.controller('UpdateCarCtrl', ['$scope', '$location', '$modal', 'Database', '$routeParams', 
                                       		function($scope, $location, $modal, Database, $routeParams) {
	var car = Database.getObject('car', $routeParams.id);
	$scope.pageTitle = "Edit a car";
	
	formCtrl($scope, $location, $modal, Database, car);
}]);

/* end form controllers */