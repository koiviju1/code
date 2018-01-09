'use strict';
angular.module('SpaTestMain', ['ngRoute','AdalAngular'])
.config(['$routeProvider', '$httpProvider', 'adalAuthenticationServiceProvider', function ($routeProvider, $httpProvider, adalProvider) {

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
    }).otherwise({ redirectTo: "/Home" });

    adalProvider.init(
        {
            instance: 'https://login.microsoftonline.com/', 
            tenant: 'opuscapita.onmicrosoft.com',
            clientId: 'c668d87c-bad1-49eb-8bc8-97133cd801e1',
            popUp: false,
            cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.
        },
        $httpProvider
        );
   
}]);
