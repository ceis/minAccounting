function saveFile(file) {
	console.log("savefile");
    file.createWriter(function(fileWriter) {
      fileWriter.onwriteend = function(e) {
        console.log('Write completed.');
      };

      fileWriter.onerror = function(e) {
        console.log('Write failed: ' + e.toString());
      };

      var blob = new Blob(['Hello Treehouse!'], {type: 'text/plain'});
      fileWriter.write(blob);
});
}

// chrome.fileSystem.chooseEntry({
// 	type: "openWritableFile"
// 	// type: "saveFile"
// }, saveFile);

angular.module('accountService', []).factory('accountService', [function() {
    return {
    	alert: function(msg) {
    		alert("accountService: " + msg);
    	}
    };
}]);

angular.module('minAccounting', ['accountService']).controller('MinAccountingCtrl',  
	['$scope', 'accountService', 
	function ($scope, accountService) {
		$scope.showAlert = function() {
			accountService.alert("bla");
		};
	}
]);