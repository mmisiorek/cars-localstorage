var carsServices = angular.module('carsServices', []);

carsServices.service('Database', function() {
	
	var getDataFromStorage = function() {
		return angular.fromJson(window.localStorage.getItem("app_database"));
	};
	
	var saveDataToStorage = function(data) {
		window.localStorage.setItem("app_database", angular.toJson(data));
	};
	
	var giveUniqueID = function(type) {
		var items = getDataFromStorage()[type],
			i = 0,
			unique = false;
		
		while(!unique) {
			unique = true;
			angular.forEach(items, function(item) {
				if(i == item.id) {
					unique = false;
				}
			});
			i++;
		}
		
		return i-1;
	};
	
	if(!angular.fromJson(window.localStorage.getItem('app_database'))) {
		window.localStorage.setItem("app_database", angular.toJson({"_internal": []}));
	}
	
	this.persistObject = function(type, obj) {
		var data = getDataFromStorage();
		if(!data) {
			return undefined;
		}
		else if(!data[type]) {
			data[type] = [];
		}
		
		var id = obj.id;
		if(id === undefined) {
			console.log('unique id');
			id = giveUniqueID(type);
			obj.id = id;
		}
		else {
			var oldObj = this.getObject(type, id),
				newArr = [];
			
			if(oldObj) {
				angular.forEach(data[type], function(val) {
					if( val.id !== oldObj.id ) {
						newArr.push(val);
					}
				});
			
				data[type] = newArr;
			}
		}
		
		data[type].push(obj);
		saveDataToStorage(data);
		
		return id;
	};

	this.getObject = function(type, id) {
		var data = getDataFromStorage();
		
		if(!data) {
			return undefined;
		}
		
		var result = undefined;
		angular.forEach(data[type], function(obj) {
			if(obj.id == id) {
				result = obj;
			}
		});
		
		return result;
	};
	
	this.getAllObjects = function(type) {
		var data = getDataFromStorage();
		if(!data) {
			return undefined;
		}
		
		return data[type];
	};
	
	this.removeObject = function(type, id) {
		var data = getDataFromStorage(),
			newArr = [];
		
		if(!data || !data[type]) {
			return false;
		}
		
		angular.forEach(data[type], function(el) {
			if( el.id !== id ) {
				newArr.push(el);
			}
		});
		
		data[type] = newArr;
		saveDataToStorage(data);
		
		return true;
	};
});