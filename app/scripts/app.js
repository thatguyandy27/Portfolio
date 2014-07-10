'use strict';

/**
 * @ngdoc overview
 * @name portfolioApp
 * @description
 * # portfolioApp
 *
 * Main module of the application.
 */
angular
  .module('portfolioApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/css-solar-system', {
        templateUrl: 'views/cssSolarSystem.html',
        controller: 'CssSolarSystemCtrl'
      })
      .when('/three-js-demo', {
        templateUrl: 'views/threejsdemo.html',
        controller: 'threeJsDemoCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
