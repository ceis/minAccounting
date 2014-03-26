angular.module('minAccounting', ['accountService'])
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
      templateUrl: 'components/account-list/template.html'
    };
  })
// .config(['$routeProvider',
//   function($routeProvider) {
//     $routeProvider.
//       when('/accounts', {
//         templateUrl: 'account-list.html',
//         controller: 'AccountListCtrl'
//       }).
//       otherwise({
//         redirectTo: '/accounts'
//       });
//   }])
// .controller('MinAccountingCtrl',  
// function ($scope, accountService) {

//     $scope.showAlert = function() {
//       accountService.alert("bla");
//     };

// })
;
