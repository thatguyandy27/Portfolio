'use strict'

angular.module('portfolioApp').controller('threejsPlanetCtrl', ['$scope',  'planetService', function($scope, planetService){
    var scene, ambientLight, light,camera, renderer, spaceObject;
    $scope.objects = planetService.retrieveAll();
    $scope.showSettings= true;

    $scope.selectedObject = $scope.objects[3]; //earth

    $scope.$watch('selectedObject', function(){
        updateObject();
    });
    $scope.lightSettings = {
        x:0, 
        y:15,
        z:50,
    }

    $scope.toggleSettings = function(){
        $scope.showSettings = !$scope.showSettings;
    };

    function updateObject(){
        if (scene == null){
            return;
        }
        if (spaceObject != null){
            scene.remove(spaceObject);
        }
    //    
        spaceObject = $scope.selectedObject.createObject();
  //      var material =
//        spaceObject = new THREE.Mesh(geometry, material);
        
        scene.add(spaceObject);

    }

    function initScene(){
        scene = new THREE.Scene();
        ambientLight = new THREE.AmbientLight( 0x888888 );
        scene.add( ambientLight );
        var lightSettings = $scope.lightSettings;
        light  = new THREE.DirectionalLight( 0xcccccc, .5 );
        light.position.set(lightSettings.x,lightSettings.y,lightSettings.z);
        scene.add( light );
        light.castShadow    = true;
        light.shadowCameraNear  = 0.01;
        light.shadowCameraFar   = 15;
        light.shadowCameraFov   = 45;
        light.shadowCameraLeft  = -1;
        light.shadowCameraRight =  1;
        light.shadowCameraTop   =  1;
        light.shadowCameraBottom= -1;
        light.shadowBias    = 0.001;
        light.shadowDarkness    = 0.2;
        light.shadowMapWidth    = 1024 *2;
        light.shadowMapHeight   = 1024 *2;

        camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
        camera.position.z = 2.5;
        camera.position.y = .5;
        camera.lookAt(new THREE.Vector3(0,0,0));

        renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("planetCanvas"),
            antialias:true
        });
        renderer.setSize( window.innerWidth, window.innerHeight - 55 );
        // document.getElementById('view').appendChild( renderer.domElement );

    }

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

    initScene();
    updateObject();
    render();

}]);

