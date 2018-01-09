'use strict';
angular.module('SpaTestMain')
.controller('homeCtrl', ['$scope', 'adalAuthenticationService', function ($scope, adalService) {
    $scope.login = function () {
        adalService.login();
    };
	
    $scope.logout = function () {
        adalService.logOut();
    };
	
	var href = 'https://login.microsoftonline.com/common/oauth2/authorize?response_type=token&client_id=';
		href += $scope.authID + '&resource=https://webdir.online.lync.com&redirect_uri=' + window.location.href;
		window.location.href = href;
		
	$scope.loginWithClientId = function(){
		var id = $scope.authId;
		var config = {
			clientId: id,
			//redirectUri: 'https://archive-main.azurewebsites.net/main.html'
			};	
		var auth = new adalService.AuthorizationContext(config);
		auth.login();
	};
		
}]);