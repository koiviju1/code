var app = angular.module('SpaTestMain');
app.controller('homeCtrl', ['$scope', 'adalAuthenticationService', function ($scope) {

	$scope.loginWithClientId = function(){
		var id = $scope.authId;
		var config = {};	    
		var auth = new AuthenticationContext(config);
		if (id === auth.config.clientId){
			auth.login();
		}
		else alert("Id is not valid");
	};	
}]);