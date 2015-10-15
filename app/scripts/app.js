'use strict';

/**
 * @ngdoc overview
 * @name appAlApp
 * @description
 * # appAlApp
 *
 * Main module of the application.
 */
var app =
angular
    .module('appAlApp', [
        'ngAnimate',
        'ui.bootstrap',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'uiGmapgoogle-maps',
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: "EventListController",
                templateUrl: "views/main.html"
            })
            .when('/event/:id', {
                controller: "EventShowController",
                templateUrl: "views/show.html"
            })
            .when('/markers/', {
                controller: "LocationController",
                templateUrl: "views/location.html"
            })
            .otherwise({
                redirectTo: '/'
            });
    });
