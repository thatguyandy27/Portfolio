import mainTemplate from './views/main.html';
import aboutTemplate from './views/about.html';
import bubblePopperTemplate from './views/bubblePopper.html';
import canvasChessTemplate from './views/canvasChess.html';
import cssSolarSystemTemplate from './views/cssSolarSystem.html';
import relationshipEditorGOTTemplate from './views/relationshipEditorGOT.html';
import relationshipMapGOTTemplate from './views/relationshipMapGOT.html';
import threejsBubblesTemplate from './views/threejsBubbles.html';
import threejsDemoTemplate from './views/threejsDemo.html';
import threejsPlanetTemplate from './views/threejsPlanet.html';
import threeJsSolarSystemTemplate from './views/threeJsSolarSystem.html';
import transparentImageDemoTemplate from './views/transparentImageDemo.html';


function templateConfig($templateCache){
  $templateCache.put('views/about.html', aboutTemplate);
  $templateCache.put('views/main.html', mainTemplate);
  
  $templateCache.put('views/bubblePopper.html', bubblePopperTemplate);
  $templateCache.put('views/canvasChess.html', canvasChessTemplate);
  $templateCache.put('views/cssSolarSystem.html', cssSolarSystemTemplate);
  $templateCache.put('views/relationshipEditorGOT.html', relationshipEditorGOTTemplate);
  $templateCache.put('views/relationshipMapGOT.html', relationshipMapGOTTemplate);
  $templateCache.put('views/threejsBubbles.html', threejsBubblesTemplate);
  $templateCache.put('views/threejsDemo.html', threejsDemoTemplate);
  $templateCache.put('views/threejsPlanet.html', threejsPlanetTemplate);
  $templateCache.put('views/threeJsSolarSystem.html', threeJsSolarSystemTemplate);
  $templateCache.put('views/transparentImageDemo.html', transparentImageDemoTemplate);
}

templateConfig.$inject = ['$templateCache'];

export default templateConfig;