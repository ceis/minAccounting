angular.module('minAccounting', ['accountService']).controller('MinAccountingCtrl',  
function ($scope, accountService) {

		$scope.showAlert = function() {
			accountService.alert("bla");
		};

});
