'use strict';

angular.module('portfolioApp').
    factory('planetService', [function(){

    function createTransparentImage(mainImage, alphaImage, callback){
        var canvasResult = document.createElement('canvas'),
            canvasAlpha = document.createElement('canvas');
        
        canvasResult.width = canvasAlpha.width = 1024;
        canvasResult.height = canvasAlpha.height = 512;

        var contextResult  = canvasResult.getContext('2d'),
            contextAlpha = canvasAlpha.getContext('2d');
        
        var imageMap  = new Image();
        imageMap.addEventListener("load", function() {

            canvasResult.width = canvasAlpha.width = imageMap.width;
            canvasResult.height = canvasAlpha.height = imageMap.height;

            contextResult.drawImage(imageMap, 0,0);
            var dataMap = contextResult.getImageData(0,0, canvasResult.width, canvasResult.height);

            var alphaMap = new Image();
            alphaMap.addEventListener("load", function(){
                contextAlpha.drawImage(alphaMap, 0,0);

                var alphaDataMap = contextAlpha.getImageData(0,0, canvasAlpha.width, canvasAlpha.height);

                var offset = 0;
                for(var y=0; y< imageMap.height; y++){
                    for(var x=0; x< imageMap.width; x++){
                        // move to rgb A 
                        
                        //should be the "A" of the X Y coordinate
                        // alpha is not offset because it is greyscale...
                        dataMap.data[offset + 3] = 255 - alphaDataMap.data[offset] / 4;

                        //move to next rgba;
                        offset += 4;
                    }
                }


                contextResult.putImageData(dataMap, 0,0);
                callback();
            });

            alphaMap.src = alphaImage;

        });

        imageMap.src = mainImage;

        return canvasResult;

    }

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
                var radius = .5, widthSegments = 32, heightSegments = 32;

                var geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

                var material = new THREE.MeshPhongMaterial({
                    map: THREE.ImageUtils.loadTexture('images/planets/earthmap1k.jpg'),
                    bumpMap: THREE.ImageUtils.loadTexture('images/planets/earthbump1k.jpg'),
                    bumpScale: .05,
                    specularMap: THREE.ImageUtils.loadTexture("images/planets/earthspec1k.jpg"),
                   // specular: new THREE.Color('grey')
                });

                var textureResult = createTransparentImage('images/planets/earthcloudmap.jpg','images/planets/earthcloudmaptrans.jpg', function(){
                    if (cloudMaterial && cloudMaterial.map){
                        cloudMaterial.map.needsUpdate = true;
                    }
                });

                var cloudGeometry    = new THREE.SphereGeometry(radius + .01, widthSegments, heightSegments)
                var cloudMaterial    = new THREE.MeshPhongMaterial({
                    map     : new THREE.Texture(textureResult),
                    side        : THREE.DoubleSide,
                    transparent : true,
                    opacity     : 0.2,
                });

                var cloudMesh  = new THREE.Mesh(cloudGeometry, cloudMaterial);

                var planetMesh  = new THREE.Mesh(geometry, material);

                planetMesh.add(cloudMesh);

                return  planetMesh ;
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