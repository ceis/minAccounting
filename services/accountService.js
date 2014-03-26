angular.module('accountService', []).factory('accountService', 
function() {

  return {
  	alert: function(msg) {
  		alert("accountService: " + msg);
  	}
  };

});
