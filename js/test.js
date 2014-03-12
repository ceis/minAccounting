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

var minAccounting = angular.module('minAccounting', []);
 
minAccounting.controller('MinAccountingCtrl',  ['$scope', function ($scope) {
	$scope.openFileForSave = function() {
		console.log("bla");
		chrome.fileSystem.chooseEntry({
			type: "openWritableFile"
			// type: "saveFile"
		}, saveFile);
	};

}]);