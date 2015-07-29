var carsFilters = angular.module('carsFilters', []);

carsFilters.filter('location', function() {
	
	return function(locObj) {
		return locObj.val+" "+locObj.dir;
	};
});

carsFilters.filter('locationLink', function() {
	
	return function(locObj) {
		var lat = (locObj.latitude.dir == 'S' ? -1 : 1 )*locObj.latitude.val,
			lon = (locObj.longitude.dir == 'W' ? -1 : 1)*locObj.longitude.val;
		
		return "https://www.google.pl/maps/@"+lat+","+lon+",8z";
	};
});

