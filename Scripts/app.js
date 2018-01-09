'use strict';
angular.module('SpaTestMain', ['ngRoute','AdalAngular'])
.config(['$routeProvider', '$httpProvider', 'adalAuthenticationServiceProvider', function ($routeProvider, $httpProvider, adalProvider) {
/*
    $routeProvider.when("/Home", {
        controller: "homeCtrl",
        templateUrl: "/Views/Home.html", // modaa tätä!
    }).when("/TodoList", {
        controller: "todoListCtrl",
        templateUrl: "/Views/TodoList.html",
        requireADLogin: true,
    }).when("/UserData", {
        controller: "userDataCtrl",
        templateUrl: "/Views/UserData.html",
    }).otherwise({ redirectTo: "/Home" });*/

    adalProvider.init(
        {
            instance: 'https://login.microsoftonline.com/', 
            tenant: 'opuscapita.onmicrosoft.com',
            clientId: '43436228-9c32-4023-9753-48e0170e642f',
            popUp: false,
            cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.
        },
        $httpProvider
        );
   
}]);
