import module from '../app-module.js';
import ThreeJSPlanetView from './threejsPlanet/threejsPlanetView.js';
import { react2angular } from 'react2angular';

module.component('threejsPlanet', react2angular(ThreeJSPlanetView));
