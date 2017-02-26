import '../libraries/OrbitControls.js';
import AboutCtrl from './about.js';
import BubblePopperCtrl from './bubblePopper.js';
import CanvasChessCtrl from './canvasChess.js';
import CssSolarSystemCtrl from './csssolarsystem.js';
import RelationshipEditorGOTCtrl from './relationshipEditorGOT.js';
import RelationshipMapGOTCtrl from './relationshipMapGOT.js';
import ThreeJSBubbleCtrl from './threejsBubbles.js';
import ThreeJSDemoCtrl from './threejsDemo.js';
import ThreeJSPlanetCtrl from './threejsPlanet.js';
import ThreeJSSolarSystemCtrl from './threejsSolarSystem.js';
import TransparentImageDemoCtrl from './transparentImageDemo.js';

import appModule from '../../app-module.js';

appModule.controller('threejsPlanetCtrl', ThreeJSPlanetCtrl)
    .controller('threeJsSolarSystemCtrl', ThreeJSSolarSystemCtrl)
    .controller('transparentImageDemoCtrl', TransparentImageDemoCtrl)
    .controller('AboutCtrl', AboutCtrl)
    .controller('bubblePopperCtrl', BubblePopperCtrl)
    .controller('CanvasChessCtrl', CanvasChessCtrl)
    .controller('CssSolarSystemCtrl', CssSolarSystemCtrl)
    .controller('relationshipEditorGOTCtrl', RelationshipEditorGOTCtrl)
    .controller('relationshipMapGOTCtrl', RelationshipMapGOTCtrl)
    .controller('threeJsBubbleCtrl', ThreeJSBubbleCtrl)
    .controller('threeJsDemoCtrl', ThreeJSDemoCtrl)
    .controller('MainCtrl', () => {});