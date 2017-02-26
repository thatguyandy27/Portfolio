import angular from 'angular';
import 'jquery';
import 'angular-animate';
import 'angular-cookies';
import 'angular-resource';
import 'angular-route';
import 'angular-sanitize';
import 'angular-touch';
import appTemplateConfig from './app-templates.js';

const module = angular
  .module('portfolioApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ]).run(appTemplateConfig);

export default module; 