import './canvasChess/canvasChess-module.js';
import module from '../../app-module.js';
import bubbleService from './bubbleService.js';
import planetService from './planetService.js';
import sixDegreesOfWesterosService from './sixDegreesOfWesterosService.js';

'use strict';
module.factory('bubbleService', bubbleService)
  .factory('planetService', planetService)
  .factory('sixDegreesOfWesterosService', sixDegreesOfWesterosService)