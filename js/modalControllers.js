var carsModalCtrls = angular.module('carsModalCtrls', []);

carsModalCtrls.controller('CarRemovalModalCtrl', ['$scope', '$modalInstance', 'Database', function($scope, $modalInstance, Database) {
	$scope.onYes = function() {
		$modalInstance.close();
	};
	
	$scope.onNo = function() {
		$modalInstance.dismiss('');
	};
}]);

carsModalCtrls.controller('ChangesSavedModalCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance) {
	$scope.onClickOk = function() {
		$modalInstance.close();
	};
}]);