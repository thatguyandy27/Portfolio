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

    function createBubble(radius, color, x, y, z){
        this.State = Bubble.States.Active;

    }

    Bubble.States = {
        Active: 0,
        Popping: 1,
        Inactive: 2
    };



    var height = window.innerHeight -  200;
    var width = window.innerWidth - 20;
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width , height);
    document.getElementById('bubbleContainer').appendChild( renderer.domElement );
    renderer.domElement.addEventListener("mousewheel", mouseWheelHandler, false);
    renderer.domElement.addEventListener("DOMMouseScroll", mouseWheelHandler, false);
    renderer.domElement.addEventListener("click", mouseClickEvent, false);

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
    var raycaster = new THREE.Raycaster();
    var projector = new THREE.Projector();
                
    function mouseClickEvent(event_info){
        ///stop any other event listener from recieving this event
        event_info.preventDefault();  
       // debugger;
        var projector = new THREE.Projector(), 
            mouse_vector = new THREE.Vector3(),
            mouse = { x: 0, y: 0, z: 1 },
            ray = new THREE.Raycaster( new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0) ),
            intersects = []; 
        //this where begin to transform the mouse cordinates to three,js cordinates
        mouse.x = ( (event_info.clientX - event_info.target.getBoundingClientRect().left) / event_info.target.getBoundingClientRect().width ) * 2 - 1;
        mouse.y = - ( (event_info.clientY - event_info.target.getBoundingClientRect().top) / event_info.target.getBoundingClientRect().height ) * 2 + 1;
            
        //this vector caries the mouse click cordinates
        mouse_vector.set( mouse.x, mouse.y, mouse.z );
        
        //the final step of the transformation process, basically this method call
        //creates a point in 3d space where the mouse click occurd
        projector.unprojectVector( mouse_vector, camera );
        
        var direction = mouse_vector.sub( camera.position ).normalize();
        
        //ray = new THREE.Raycaster( camera.position, direction );
        ray.set( camera.position, direction );
        
        //asking the raycaster if the mouse click touched the sphere object
        intersects = ray.intersectObject( sphere );
        
        //the ray will return an array with length of 1 or greater if the mouse click
        //does touch the sphere object
        if( intersects.length ) {
            
            alert( "hit" );
            
        }

//         event.preventDefault();

//        // var coordinates = getCursorPosition(event);

//         var coordinates = {
//             x: ( (event.clientX - event.target.getBoundingClientRect().left) / event.target.getBoundingClientRect().width ) * 2 - 1,
//             y :- ( (event.clientY - event.target.getBoundingClientRect().top) / event.target.getBoundingClientRect().height ) * 2 + 1 
//         };
        
//         var mouseVector = new THREE.Vector3( 
//             ( coordinates.x / width ) * 2 - 1, 
//             - ( coordinates.y / height ) * 2 + 1, 
//             0.5 
//         );
//         // var coordinates = {
//         //     x: ( event.clientX / window.innerWidth ) * 2 - 1,
//         //     y: ( event.clientY / window.innerHeight ) * 2 + 1
//         // };
//         //var coordinates = getCursorPosition(e);
     
//         //var mouseVector = new THREE.Vector3( coordinates.x, coordinates.y, 1 );

//         // var mv = new THREE.Vector3(
//         //     (event.clientX / window.innerWidth) * 2 - 1,
//         //     -(event.clientY / window.innerHeight) * 2 + 1,
//         //     0.5 );

//         projector.unprojectVector( mouseVector, camera );
// //        var raycaster = projector.pickingRay(mouseVector, camera);

//         raycaster.set( camera.position, mouseVector.sub( camera.position ).normalize() );

//         var intersects = raycaster.intersectObjects( sphere );

//         if (intersects.length > 0){
//             console.log("You hit the ball");
//         }
//         else{
//             console.log("You missed!");
//         }
    }

    function getCursorPosition(e) {
        var elem = renderer.domElement, 
            boundingRect = elem.getBoundingClientRect();
        var x = (event.clientX - boundingRect.left) * (elem.width / boundingRect.width);
        var y = (event.clientY - boundingRect.top) * (elem.height / boundingRect.height);
        console.log(x);
        console.log(y);
        return {
            x: x,
            y:y
        };
    }

});
