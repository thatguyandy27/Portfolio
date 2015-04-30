'use strict';

angular.module('portfolioApp').
    factory('planetService', [function(){

    function retrieveAll(){
        return [{
            name:"Sun",
            createObject: function(){ 
                var material =  new THREE.MeshBasicMaterial({map:
                    THREE.ImageUtils.loadTexture('images/planets/sunmap.jpg')
                });
                var geometry = new THREE.SphereGeometry(0.5, 32, 32);

                return  new THREE.Mesh(geometry, material);
            }

        },{
            name:"Mercury",
            createObject: function(){
                var geometry = new THREE.SphereGeometry(0.5, 32, 32);
                var material =  new THREE.MeshPhongMaterial({
                    map: THREE.ImageUtils.loadTexture('images/planets/mercurymap.jpg'),
                    bumpMap: THREE.ImageUtils.loadTexture('images/planets/mercurybump.jpg'),
                    bumpScale:.005
                });
                return  new THREE.Mesh(geometry, material);
            }
        },{
            name: "Venus",
            createObject: function(){ 
                var geometry = new THREE.SphereGeometry(0.5, 32, 32);

                var material = new THREE.MeshPhongMaterial({
                    map: THREE.ImageUtils.loadTexture('images/planets/venusmap.jpg'),
                    bumpMap: THREE.ImageUtils.loadTexture('images/planets/venusbump.jpg'),
                    bumpScale: .005
                });

                return  new THREE.Mesh(geometry, material);
            }
        },{
            name: "Earth",
            createObject: function(options){ 

                var geometry = new THREE.SphereGeometry(0.5, 32, 32);

                var material = new THREE.MeshPhongMaterial({
                    map: THREE.ImageUtils.loadTexture('images/planets/earthmap1k.jpg'),
                    bumpMap: THREE.ImageUtils.loadTexture('images/planets/earthbump1k.jpg'),
                    bumpScale: .05,
                    specularMap: THREE.ImageUtils.loadTexture("images/planets/earthspec1k.jpg"),
                    specular: new THREE.Color('grey')
                });

                return  new THREE.Mesh(geometry, material);
            }
        },{
            name: "Mars",
            createObject: function(){ 
                var geometry = new THREE.SphereGeometry(0.5, 32, 32);

                var material = new THREE.MeshPhongMaterial({
                    map: THREE.ImageUtils.loadTexture('images/planets/marsmap1k.jpg'),
                    bumpMap: THREE.ImageUtils.loadTexture('images/planets/marsbump1k.jpg'),
                    bumpScale: .05
                });
                return  new THREE.Mesh(geometry, material);
            }
        },{
            name: "Jupiter",
            createObject: function(){ 
                var geometry = new THREE.SphereGeometry(0.5, 32, 32);

                var material = new THREE.MeshPhongMaterial({
                    map:THREE.ImageUtils.loadTexture('images/planets/jupiter2_2k.jpg')
                });

                return  new THREE.Mesh(geometry, material);
            }
        },{
            name: "Saturn",
            createObject: function(){
                var geometry = new THREE.SphereGeometry(0.5, 32, 32);
                var material = new THREE.MeshPhongMaterial({
                    map: THREE.ImageUtils.loadTexture('images/planets/saturnmap.jpg')
                });

                return  new THREE.Mesh(geometry, material);
            }
        },{
            name: "Uranus",
            createObject: function(){
                var geometry = new THREE.SphereGeometry(0.5, 32, 32);


                var material =  new THREE.MeshPhongMaterial({
                    map: THREE.ImageUtils.loadTexture("images/planets/uranusmap.jpg"),
                    bumpMap:THREE.ImageUtils.loadTexture("images/planets/uranusmap.jpg"),
                    bumpScale:.005,
                    castShadow:true,
                    createShadow:true
                });

                var ring = new THREE.TorusGeometry(1);



                return  new THREE.Mesh(geometry, material);
            }
        },{
            name: "Neptune",
            createObject: function(){
                var geometry = new THREE.SphereGeometry(0.5, 32, 32);

                var material = new THREE.MeshPhongMaterial({
                    map: THREE.ImageUtils.loadTexture("images/planets/neptunemap.jpg")
                });

                return  new THREE.Mesh(geometry, material);
            }
        },{
            name: "Pluto",
            createObject: function(){
               var geometry = new THREE.SphereGeometry(0.5, 32, 32);
               var material = new THREE.MeshPhongMaterial({
                    map: THREE.ImageUtils.loadTexture('images/planets/plutomap1k.jpg'),
                    bumpMap: THREE.ImageUtils.loadTexture('images/planets/plutobump1k.jpg'),
                    bumpScale: .005
                });

               return  new THREE.Mesh(geometry, material);
            }
        },{
            name: "Moon",
            createObject: function(){
                var geometry = new THREE.SphereGeometry(0.5, 32, 32);
                var material = new THREE.MeshPhongMaterial({
                    map: THREE.ImageUtils.loadTexture('images/planets/moonmap2k.jpg'),
                    bumpMap: THREE.ImageUtils.loadTexture('images/planets/moonbump2k.jpg'),
                    bumpScale: .005
                });

                return  new THREE.Mesh(geometry, material);
            }
        }
        ];
    }

    return {
        retrieveAll: retrieveAll
    };

}]);