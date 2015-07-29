var carsApp = angular.module('carsApp', ['ngRoute', 'carsControllers', 'ui.bootstrap', 'carsDirectives', 'carsServices', 'carsFilters', 'carsModalCtrls']);

carsApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
			.when('/list', {
				templateUrl: 'partials/list.html',
				controller: 'ListCarsCtrl'
			})
			.when('/details/:id', {
				templateUrl: 'partials/details.html',
				controller: 'DisplayCarCtrl'
			})
			.when('/new',{
				templateUrl: 'partials/form.html',
				controller: 'NewCarCtrl'
			})
			.when('/edit/:id', {
				templateUrl: 'partials/form.html',
				controller: 'UpdateCarCtrl'
			})
			.otherwise({
				redirectTo: '/list'
			});
}]);