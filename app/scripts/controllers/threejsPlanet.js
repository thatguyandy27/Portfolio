'use strict'

angular.module('portfolioApp').controller('threejsPlanetCtrl', ['$scope',  'planetService', function($scope, planetService){
    $scope.objects = planetService.retrieveAll();

    $scope.selectedObject = $scope.objects[3]; //earth

    var scene = new THREE.Scene();
    var ambientLight = new THREE.AmbientLight( 0x000000 );
    scene.add( ambientLight );


    var light   = new THREE.DirectionalLight( 0xcccccc, 1 )
    light.position.set(5,5,5)
    scene.add( light )
    light.castShadow    = true
    light.shadowCameraNear  = 0.01
    light.shadowCameraFar   = 15
    light.shadowCameraFov   = 45
    light.shadowCameraLeft  = -1
    light.shadowCameraRight =  1
    light.shadowCameraTop   =  1
    light.shadowCameraBottom= -1
    light.shadowBias    = 0.001
    light.shadowDarkness    = 0.2
    light.shadowMapWidth    = 1024
    light.shadowMapHeight   = 1024

    var camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 5;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight - 50 );
    document.body.appendChild( renderer.domElement );

    var geometry   = new THREE.SphereGeometry(0.5, 32, 32)
   // var material  = new THREE.MeshBasicMaterial();
    //var material = new THREE.MeshBasicMaterial( { color: 0x2f4f4f });//0xff0000 } );
    // var material = new THREE.MeshPhongMaterial({
    //     // map :THREE.ImageUtils.loadTexture('images/planets/earthmap1k.jpg')
    //     map: THREE.ImageUtils.loadTexture('images/planets/earthlights1k.jpg'),
    //     //lightMap: THREE.ImageUtils.loadTexture('images/planets/earthmap1k.jpg')
    //     //normalMap: THREE.ImageUtils.loadTexture('images/planets/earthlights1k.jpg')
    //     emissive: '#ffffff'
    // });
    //material.
    //material.map    = THREE.ImageUtils.loadTexture('images/planets/earthlights1k.jpg')

    var material = $scope.selectedObject.getMaterial();

    var spaceObject = new THREE.Mesh(geometry, material);
    
    scene.add(spaceObject);

    function render() {
        requestAnimationFrame(render);
        spaceObject.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    window.addEventListener( 'resize', function () {
                
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }, false );

    render();

}]);

