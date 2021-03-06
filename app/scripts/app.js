'use strict';

import module from '../app-module.js';
/**
 * @ngdoc overview
 * @name portfolioApp
 * @description
 * # portfolioApp
 *
 * Main module of the application.
 */

module.config([ '$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
  enabled: true,
  requireBase: false
});


    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        activeTab: ''
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        activeTab: 'about'
      })
      .when('/bubble-popper', {
        templateUrl: 'views/bubblePopper.html',
        controller: 'bubblePopperCtrl',
        activeTab: 'bubblePopper'
      })
      .when('/css-solar-system', {
        templateUrl: 'views/cssSolarSystem.html',
        controller: 'CssSolarSystemCtrl',
        activeTab: 'cssSolarSystem'
      })
      .when('/canvas-chess', {
        templateUrl: 'views/canvasChess.html',
        controller: 'CanvasChessCtrl'
      })
      .when('/three-js-demo', {
        templateUrl: 'views/threejsdemo.html',
        controller: 'threeJsDemoCtrl'
      })
       .when('/three-js-bubbles', {
        templateUrl: 'views/threejsbubbles.html',
        controller: 'threeJsBubbleCtrl'
      })
      .when('/three-js-solarsystem', {
        templateUrl: 'views/threeJsSolarSystem.html.html',
        controller: 'threeJsSolarSystemCtrl'
      })
      .when('/six-degrees-of-westeros', {
        templateUrl: 'views/relationshipMapGOT.html',
        controller: 'relationshipMapGOTCtrl'
      })
      .when('/six-degrees-of-westeros-editor', {
        templateUrl: 'views/relationshipEditorGOT.html',
        controller: 'relationshipEditorGOTCtrl'
      })
      .when('/three-js-planet', {
        templateUrl: 'views/threejsPlanet.html',
        controller: 'threejsPlanetCtrl'
      })
      .when('/image-merge-demo', {
        templateUrl: 'views/transparentImageDemo.html',
        controller: 'transparentImageDemoCtrl'
      })

      .otherwise({
        redirectTo: '/'
      });
  }]).run(['$rootScope', '$location', function($rootScope, $location){
   var path = function() { return $location.path();};
   $rootScope.$watch(path, function(newVal, oldVal){
     $rootScope.activeTab = (newVal)? newVal.substr(1) : '';
   });
}]);
