'use strict';

/**
 * @ngdoc function
 * @name portfolioApp.controller:CsssolarsystemCtrl
 * @description
 * # CsssolarsystemCtrl
 * Controller of the portfolioApp
 */
angular.module('portfolioApp')
  .controller('threeJsBubbleCtrl', function ($scope) {
    var height = window.innerHeight -  200;
    var width = window.innerWidth - 20;
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width , height);
    document.getElementById('bubbleContainer').appendChild( renderer.domElement );
    renderer.domElement.addEventListener("mousewheel", mouseWheelHandler, false);
    renderer.domElement.addEventListener("DOMMouseScroll", mouseWheelHandler, false);

    var geometry = new THREE.SphereGeometry(2, 32, 32);
    var material = new THREE.MeshLambertMaterial( { color: 0x2f4f4f });//0xff0000 } );
    var sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );
    // White directional light at half intensity shining from the top.
     // add subtle ambient lighting
    //  var ambientLight = new THREE.AmbientLight(0xbbbbbb);
    //  scene.add(ambientLight);
      
      // directional lighting
      var directionalLight = new THREE.DirectionalLight(0xffffff);
      directionalLight.position.set(50, 50, 0).normalize();
      scene.add(directionalLight);

    camera.position.z = 15;


    function render() {
       

        requestAnimationFrame(render);
        sphere.rotation.x += 0.1;
        sphere.rotation.y += 0.1;
        renderer.render(scene, camera);
    }
   // camera.lookAt(new THREE.Vector3(0,0,0));
    render();


    function mouseWheelHandler(e){
        e = window.event || e; // old IE support
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

        //console.log(delta);
        camera.position.z -= delta;
    }

});
