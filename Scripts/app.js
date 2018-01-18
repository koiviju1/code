'use strict';
angular.module('SpaTestMain',['ngRoute','AdalAngular']).config(['$routeProvider', '$httpProvider', 'adalAuthenticationServiceProvider', function ($routeProvider, $httpProvider, adalProvider) {

		$routeProvider.when("/", {
			controller: "/Scripts/mainCtrl.js",
			templateUrl: "/index.html",
		}).when("/Main", {
			controller: "/Scripts/mainCtrl.js",
			templateUrl: "/Main/main.html",
			requireADLogin: true,
		}).otherwise({ redirectTo: "/Main/main.html" });
		
	    adalProvider.init(
        {
			tenant: 'opuscapita.onmicrosoft.com',
            clientId: '43436228-9c32-4023-9753-48e0170e642f',
			redirectUri: 'https://archive-main.azurewebsites.net/Main/main.html',
			instance: 'https://login.microsoftonline.com/', 
            popUp: false,
            //cacheLocation: 'localStorage'
        },
        $httpProvider
        );
}]);
