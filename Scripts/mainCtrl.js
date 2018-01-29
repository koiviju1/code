'use strict';
angular.module('SpaTestMain').controller('mainCtrl', ['$scope', '$location', 'adalAuthenticationService', function ($scope, $location, adalService) {
        var uriuri = $location.absUrl();
        alert(uriuri.substring(uriuri.indexOf("id_token=")+"id_token=".length,uriuri.indexOf("&state")));
        var storage = 'spablobstorage';
	var sas = uriuri.substring(uriuri.indexOf("id_token=")+"id_token=".length,uriuri.indexOf("&state"));
        adalService.config.headers.Authorization = 'Bearer ' + sas;
        
	var checkParameters = function () {
		if (storage === null || storage.length < 1) {
			alert('Please enter a valid storage account name!');
			return false;
		}
		if (sas === null || sas.length < 1) {
			alert('Please enter a valid SAS Token!');
			return false;
		}
                
		else return true;
        };
	
	var getBlobService = function () {
		
            if (!checkParameters()) return null;
            var blobUri = 'https://'+ storage +'.blob.core.windows.net/';
            var blobService = AzureStorage.createBlobServiceWithSas(blobUri, sas).withFilter(new AzureStorage.ExponentialRetryPolicyFilter());
            
            return blobService;
        };
	
	var refreshContainer = function () {
		var blobService = getBlobService();
		if (!blobService) return;
                alert(blobService);
		$scope.containers = 'Loading...';
		blobService.listContainersSegmented(null, function (error, results) {
			if (error) {
				alert('List container error, please open browser console to view detailed error');
				console.log(error);
			} else {
				var output = [];
				output.push('<tr>',
					'<th>ContainerName</th>',
					'<th>ContainerETag</th>',
					'<th>LastModified</th>',
					'<th>Operations</th>',
					'</tr>');
				if (results.entries.length < 1) {
					output.push('<tr><td>Empty results...</td></tr>');
				}
				var n = results.entries.length;
				for (var i = 0, container; i < n; i++) {
					container = results.entries[i];
					output.push('<tr>',
						'<td>', container.name, '</td>',
						'<td>', container.etag, '</td>',
						'<td>', container.lastModified, '</td>',
						'<td>', '<button class="btn btn-xs btn-danger" onclick="deleteContainer(\'', container.name, '\')">Delete</button> ',
						'<button class="btn btn-xs btn-success" onclick="viewContainer(\'', container.name, '\')">Select</button>', '</td>',
						'</tr>');
				}
               
				var k = '<table class="table table-condensed table-bordered">' + output.join('') + '</table>';
				if (k.length !== 1) {
					$scope.containers = "";
					angular.element(document.body).append(k);
				} else {
					$scope.containers = "";
				}
			}
		});
        };
	
	var showContainers = function () {
		refreshContainer();
        }
	
	var initialize = function(){
           showContainers();
	};
	
	initialize();
	
	$scope.logout = function(){
            adalService.logOut();
	};
	
}]);
