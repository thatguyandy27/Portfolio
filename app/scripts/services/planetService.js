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
                        dataMap.data[offset + 3] = 255 - alphaDataMap.data[offset];

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

    // a good chunk of this algorithm is from http://planetmaker.wthr.us/#
    function createRingGeometry(innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength){

        var geometry = new THREE.Geometry();

        innerRadius = innerRadius || 0;
        outerRadius = outerRadius || 50;
        // start at 0
        thetaStart = thetaStart || 0;
        // go all the way around by default.
        thetaLength = thetaLength || Math.PI * 2;

        // 
        thetaSegments = thetaSegments != null ? Math.max( 3, thetaSegments ) : 8;
        phiSegments = phiSegments != null ? Math.max( 3, phiSegments ) : 8;

        var phiIndex, thetaIndex, uvs = [], radius = innerRadius, radiusStep = ( ( outerRadius - innerRadius ) / phiSegments);

        // creating the verticies of the circle.


        for( phiIndex = 0; phiIndex <= phiSegments; phiIndex++) {//concentric circles inside ring
            for( thetaIndex = 0; thetaIndex <= thetaSegments; thetaIndex++) {//number of segments per circle

                var vertex = new THREE.Vector3();
                
                vertex.x = radius * Math.cos( thetaStart + thetaIndex / thetaSegments * thetaLength );
                vertex.y = radius * Math.sin( thetaStart + thetaIndex / thetaSegments * thetaLength );
                
                geometry.vertices.push( vertex );
                uvs.push( new THREE.Vector2((phiIndex / phiSegments), ( vertex.y / radius + 1 ) / 2));
            }
            
            radius += radiusStep;

        }

        // creating the faces

        var n = new THREE.Vector3( 0, 0, 1 );
    
        for( phiIndex = 0; phiIndex < phiSegments; phiIndex++) {//concentric circles inside ring

            for( thetaIndex = 0; thetaIndex <= thetaSegments; thetaIndex++) {//number of segments per circle
                
                var v1, v2, v3;

                v1 = thetaIndex + (thetaSegments * phiIndex) + phiIndex;
                v2 = thetaIndex + (thetaSegments * phiIndex) + thetaSegments + phiIndex;
                v3 = thetaIndex + (thetaSegments * phiIndex) + thetaSegments + 1 + phiIndex;
                
                geometry.faces.push( new THREE.Face3( v1, v2, v3, [ n, n, n ] ) );
                geometry.faceVertexUvs[ 0 ].push( [ uvs[ v1 ], uvs[ v2 ], uvs[ v3 ] ]);
                
                v1 = thetaIndex + (thetaSegments * phiIndex) + phiIndex;
                v2 = thetaIndex + (thetaSegments * phiIndex) + thetaSegments + 1 + phiIndex;
                v3 = thetaIndex + (thetaSegments * phiIndex) + 1 + phiIndex;
                
                geometry.faces.push( new THREE.Face3( v1, v2, v3, [ n, n, n ] ) );
                geometry.faceVertexUvs[ 0 ].push( [ uvs[ v1 ], uvs[ v2 ], uvs[ v3 ] ]);

            }
        }
                 
      //  geometry.computeCentroids();
        geometry.computeFaceNormals();
        geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), radius);

        return geometry;

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
                    specular: new THREE.Color('grey'),
                    shininess: 10
                });

                var textureResult = createTransparentImage('images/planets/earthcloudmap.jpg','images/planets/earthcloudmaptrans.jpg', function(){
                    if (cloudMaterial && cloudMaterial.map){
                        cloudMaterial.map.needsUpdate = true;
                    }
                });

                var cloudGeometry    = new THREE.SphereGeometry(radius + .005, widthSegments, heightSegments)
                var cloudMaterial    = new THREE.MeshPhongMaterial({
                    map     : new THREE.Texture(textureResult),
                    side        : THREE.DoubleSide,
                    transparent : true,
                    opacity     : 0.8,
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
                var radius = .5;
                var geometry = new THREE.SphereGeometry(radius, 32, 32);

                var material = new THREE.MeshPhongMaterial({
                    map:THREE.ImageUtils.loadTexture('images/planets/jupiter2_2k.jpg')
                });

                 var ringTexture = createTransparentImage('images/planets/saturnringcolor.jpg', 'images/planets/saturnringpattern.gif', function(){
                    if (ringMaterial && ringMaterial.map){
                        ringMaterial.map.needsUpdate = true;
                    }
                });

                var innerRadius = radius +.01,
                    outerRadius = radius + .2,
                    ringThetaSegments = 64,
                    ringPhiSegments = 8;

                var ringGeometry = createRingGeometry(innerRadius, outerRadius, ringThetaSegments, ringPhiSegments);
                //new THREE.RingGeometry(innerRadius, outerRadius, ringThetaSegments, ringPhiSegments);

                var ringMaterial = new THREE.MeshPhongMaterial({
                    map: new THREE.Texture(ringTexture),
                    side: THREE.DoubleSide,
                    transparent:true,
                    opacity: .9
                });
                ringGeometry.faceVertexUvs[0].push( new THREE.Vector2( 
                    innerRadius/(ringThetaSegments-1), outerRadius/ (ringPhiSegments-1) ) );

                var ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
                var planetMesh = new THREE.Mesh(geometry, material);
                ringMesh.lookAt(new THREE.Vector3(0,1,0));


                ringMesh.receiveShadow = true;
                ringMesh.castShadow = true;
                planetMesh.receiveShadow = true;
                planetMesh.castShadow=  true;
                planetMesh.add(ringMesh);


                return  planetMesh;

            }
        },{
            name: "Saturn",
            createObject: function(){
                var radius = .5;
                var geometry = new THREE.SphereGeometry(radius, 32, 32);
                var material = new THREE.MeshPhongMaterial({
                    map: THREE.ImageUtils.loadTexture('images/planets/saturnmap.jpg')
                });

                var ringTexture = createTransparentImage('images/planets/saturnringcolor.jpg', 'images/planets/saturnringpattern.gif', function(){
                    if (ringMaterial && ringMaterial.map){
                        ringMaterial.map.needsUpdate = true;
                    }
                });

                var innerRadius = radius +.01,
                    outerRadius = radius + .8,
                    ringThetaSegments = 64,
                    ringPhiSegments = 8;

                var ringGeometry = createRingGeometry(innerRadius, outerRadius, ringThetaSegments, ringPhiSegments);
                //new THREE.RingGeometry(innerRadius, outerRadius, ringThetaSegments, ringPhiSegments);

                var ringMaterial = new THREE.MeshPhongMaterial({
                    map: new THREE.Texture(ringTexture),
                    side: THREE.DoubleSide,
                    transparent:true,
                    opacity: .9
                });
                ringGeometry.faceVertexUvs[0].push( new THREE.Vector2( 
                    innerRadius/(ringThetaSegments-1), outerRadius/ (ringPhiSegments-1) ) );

                var ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
                var planetMesh = new THREE.Mesh(geometry, material);
                ringMesh.lookAt(new THREE.Vector3(0,1,0));


                ringMesh.receiveShadow = true;
                ringMesh.castShadow = true;
                planetMesh.receiveShadow = true;
                planetMesh.castShadow=  true;
                planetMesh.add(ringMesh);


                return  planetMesh;
            }
        },{
            name: "Uranus",
            createObject: function(){
                var radius = .5;
                var geometry = new THREE.SphereGeometry(radius, 32, 32);


                var material =  new THREE.MeshPhongMaterial({
                    map: THREE.ImageUtils.loadTexture("images/planets/uranusmap.jpg"),
                    bumpMap:THREE.ImageUtils.loadTexture("images/planets/uranusmap.jpg"),
                    bumpScale:.005,
                    castShadow:true,
                    createShadow:true
                });

                var ringGeometry = new THREE.RingGeometry(radius + .01, radius + .5,  10);



                var ringTexture = createTransparentImage('images/planets/uranusringcolour.jpg', 'images/planets/uranusringtrans.gif', function(){
                    if (ringMaterial && ringMaterial.map){
                        ringMaterial.map.needsUpdate = true;
                    }
                });

                var innerRadius = radius +.01,
                    outerRadius = radius + .1,
                    ringThetaSegments = 64,
                    ringPhiSegments = 8;

                var ringGeometry = createRingGeometry(innerRadius, outerRadius, ringThetaSegments, ringPhiSegments);
                //new THREE.RingGeometry(innerRadius, outerRadius, ringThetaSegments, ringPhiSegments);

                var ringMaterial = new THREE.MeshPhongMaterial({
                    map: new THREE.Texture(ringTexture),
                    side: THREE.DoubleSide,
                    transparent:true,
                    opacity: .9
                });
                ringGeometry.faceVertexUvs[0].push( new THREE.Vector2( 
                    innerRadius/(ringThetaSegments-1), outerRadius/ (ringPhiSegments-1) ) );

                var ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
                var planetMesh = new THREE.Mesh(geometry, material);
                ringMesh.lookAt(new THREE.Vector3(0,0,1));


                ringMesh.receiveShadow = true;
                ringMesh.castShadow = true;
                planetMesh.receiveShadow = true;
                planetMesh.castShadow=  true;
                planetMesh.add(ringMesh);


                return  planetMesh;

                //var ring = new THREE.TorusGeometry(1);
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