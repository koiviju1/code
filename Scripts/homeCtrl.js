'use strict';
angular.module('SpaTestMain')
.controller('homeCtrl', ['$scope', 'adalAuthenticationService', function ($scope, adalService) {
    $scope.login = function () {
        adalService.login();
    };
	
    $scope.logout = function () {
        adalService.logOut();
    };
	
	$scope.loginWithClientId = function(){
		var id = $scope.authId;
		var config = {
			clientId: id,
			redirectUri: 'https://archive-main.azurewebsites.net/main.html'			
			};	
		var auth = new adalService.AuthorizationContext(config);
		auth.login();
	};
		
}]);