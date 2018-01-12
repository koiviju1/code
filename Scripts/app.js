'use strict';
angular.module('SpaTestMain',['ngRoute','AdalAngular']).config(['$routeProvider', '$httpProvider', 'adalAuthenticationServiceProvider', function ($routeProvider, $httpProvider, adalProvider) {

		$routeProvider.when("/", {
			controller: "homeCtrl",
			templateUrl: "/index.html",
		}).when("/main", {
			controller: "mainCtrl",
			templateUrl: "/main.html",
			requireADLogin: true,
		}).otherwise({ redirectTo: "/" });
		
	    adalProvider.init(
        {
			tenant: 'opuscapita.onmicrosoft.com',
            clientId: '43436228-9c32-4023-9753-48e0170e642f',
			redirectUri: 'https://archive-main.azurewebsites.net/main.html',
			instance: 'https://login.microsoftonline.com/', 
            popUp: false,
            cacheLocation: 'localStorage'
        },
        $httpProvider
        );
}]);
