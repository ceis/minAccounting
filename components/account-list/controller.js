angular.module('minAccounting')
.controller('AccountListCtrl',  
function ($scope, accountService) {

		$scope.showAlert = function() {
			accountService.alert("bla");
		};

})
.directive('account-list', function() {
    return {
      restrict: 'E',
      // scope: {
      //   customerInfo: '=info'
      // },
      templateUrl: 'components/account-list/template.html',
      controller: "AccountListCtrl"
    };
  });
