'use strict';
var mainApp = angular.module('SpaTestMain');
mainApp.controller('mainCtrl', function($scope, $location){
	
    var container = 'spablobstorage';
    //var clientId = $location.query();
	var sas = "?sv=2017-04-17&ss=b&srt=sco&sp=rwdlac&se=2018-01-12T15:19:46Z&st=2018-01-12T07:19:46Z&spr=https&sig=2kdhYKcmkNaiuPfA9nuLLOQHoshWd5pVqbobQYAE1Bg%3D";

	var checkParameters = function () {
		if (container === null || container.length < 1) {
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
		var blobUri = 'https://'+ container +'.blob.core.windows.net/';
        //var blobUri = 'https://' + $scope.storageAccount + '.blob.core.windows.net/';
        //var sas = $scope.sasToken;
		
		alert(blobUri + sas); // tähän asti ok!
        var blobService = AzureStorage.createBlobServiceWithSas(blobUri, sas).withFilter(new AzureStorage.ExponentialRetryPolicyFilter());
        return blobService;
    };
	
	var refreshContainer = function () {
		var blobService = getBlobService();
		if (!blobService) return;

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
				alert("refreshContainer after loop");               
				var k = '<table class="table table-condensed table-bordered">' + output.join('') + '</table>';
				if (k.length != 1) {
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
	// toimii
	initialize();
	
	// nappulaa kun painetaan tekee näin. korvataan logoutilla.
	$scope.placeholder = function(){
		
	};
	
});
