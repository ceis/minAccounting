angular.module('minAccounting', [
  'ngRoute',
  'accountList'
])
.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/accounts', {
        templateUrl: '../components/account-list/account-list.html',
        controller: 'AccountListCtrl'
      }).
      otherwise({
        redirectTo: '/accounts'
      });
  }])
// .controller('MinAccountingCtrl',  
// function ($scope, accountService) {

//     $scope.showAlert = function() {
//       accountService.alert("bla");
//     };

// })
;
