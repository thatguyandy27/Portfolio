import THREE from 'three/three.js';

class PlanetService{

  createTransparentImage(mainImage, alphaImage, callback){
    const canvasResult = document.createElement('canvas'),
        canvasAlpha = document.createElement('canvas');
      
    canvasResult.width = canvasAlpha.width = 1024;
    canvasResult.height = canvasAlpha.height = 512;

    const contextResult  = canvasResult.getContext('2d'),
        contextAlpha = canvasAlpha.getContext('2d');
      
    const imageMap  = new Image();
    imageMap.addEventListener("load", () => {

      canvasResult.width = canvasAlpha.width = imageMap.width;
      canvasResult.height = canvasAlpha.height = imageMap.height;

      contextResult.drawImage(imageMap, 0,0);
      const dataMap = contextResult.getImageData(0,0, canvasResult.width, canvasResult.height);

      const alphaMap = new Image();
      alphaMap.addEventListener("load", () => {
        contextAlpha.drawImage(alphaMap, 0,0);

        const alphaDataMap = contextAlpha.getImageData(0,0, canvasAlpha.width, canvasAlpha.height);

        let offset = 0;
        for(let y=0; y< imageMap.height; y++){
          for(let x=0; x< imageMap.width; x++){
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
  createRingGeometry(innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength){

    const geometry = new THREE.Geometry();

    innerRadius = innerRadius || 0;
    outerRadius = outerRadius || 50;
    // start at 0
    thetaStart = thetaStart || 0;
    // go all the way around by default.
    thetaLength = thetaLength || Math.PI * 2;

    // 
    thetaSegments = thetaSegments != null ? Math.max( 3, thetaSegments ) : 8;
    phiSegments = phiSegments != null ? Math.max( 3, phiSegments ) : 8;

    let phiIndex, thetaIndex, uvs = [], radius = innerRadius, radiusStep = ( ( outerRadius - innerRadius ) / phiSegments);

    // creating the verticies of the circle.
    for( phiIndex = 0; phiIndex <= phiSegments; phiIndex++) {//concentric circles inside ring
      for( thetaIndex = 0; thetaIndex <= thetaSegments; thetaIndex++) {//number of segments per circle
        let vertex = new THREE.Vector3();
        
        vertex.x = radius * Math.cos( thetaStart + thetaIndex / thetaSegments * thetaLength );
        vertex.y = radius * Math.sin( thetaStart + thetaIndex / thetaSegments * thetaLength );
        
        geometry.vertices.push( vertex );
        uvs.push( new THREE.Vector2((phiIndex / phiSegments), ( vertex.y / radius + 1 ) / 2));
      }
      
      radius += radiusStep;
    }

    // creating the faces
    let n = new THREE.Vector3( 0, 0, 1 );
    for( phiIndex = 0; phiIndex < phiSegments; phiIndex++) {//concentric circles inside ring
      for( thetaIndex = 0; thetaIndex <= thetaSegments; thetaIndex++) {//number of segments per circle
        let v1, v2, v3;

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

  retrieveAll(){
    let service = this;
    return [{
      name:"Sun",
      createObject: function(){ 
        const material =  new THREE.MeshBasicMaterial({map:
          THREE.ImageUtils.loadTexture('images/planets/sunmap.jpg')
        });
        const geometry = new THREE.SphereGeometry(0.5, 32, 32);

        const sun = new THREE.Mesh(geometry, material);
        sun.rotateOnAxis(new THREE.Vector3(0,0,1), -5.25 * Math.PI / 180);

        const speed = .2;
        sun.animation = function (){
          this.rotateOnAxis(new THREE.Vector3(0,1,0), speed * Math.PI / 180);
        };

        return sun;
      }
    }, {
      name:"Mercury",
      createObject: function(){
        const geometry = new THREE.SphereGeometry(0.5, 32, 32);
        const material =  new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('images/planets/mercurymap.jpg'),
            bumpMap: THREE.ImageUtils.loadTexture('images/planets/mercurybump.jpg'),
            bumpScale:.005
        });

        const mercury = new THREE.Mesh(geometry, material);
        const speed = .2;
        mercury.animation = function (){
          this.rotateOnAxis(new THREE.Vector3(0,1,0), speed * Math.PI / 180);
        };

        return mercury;
      }
      },{
      name: "Venus",
      createObject: function(){ 
        const geometry = new THREE.SphereGeometry(0.5, 32, 32);

        const material = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('images/planets/venusmap.jpg'),
            bumpMap: THREE.ImageUtils.loadTexture('images/planets/venusbump.jpg'),
            bumpScale: .005
        });

        const venus = new THREE.Mesh(geometry, material);
        venus.rotateOnAxis(new THREE.Vector3(0,0,1), -177 * Math.PI / 180);

        const count = .2;
        venus.animation = function (){
              this.rotateOnAxis(new THREE.Vector3(0,-1,0), -count * Math.PI / 180);
        };

        return venus;
      }
      },{
        name: "Earth",
        createObject: function(options){ 
          const radius = .5, widthSegments = 32, heightSegments = 32;

          const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

          const material = new THREE.MeshPhongMaterial({
              map: THREE.ImageUtils.loadTexture('images/planets/earthmap1k.jpg'),
              bumpMap: THREE.ImageUtils.loadTexture('images/planets/earthbump1k.jpg'),
              bumpScale: .05,
              specularMap: THREE.ImageUtils.loadTexture("images/planets/earthspec1k.jpg"),
              specular: new THREE.Color('grey'),
              shininess: 10
          });

          const textureResult = service.createTransparentImage('images/planets/earthcloudmap.jpg','images/planets/earthcloudmaptrans.jpg', function(){
              if (cloudMaterial && cloudMaterial.map){
                  cloudMaterial.map.needsUpdate = true;
              }
          });

          const cloudGeometry    = new THREE.SphereGeometry(radius + .005, widthSegments, heightSegments)
          const cloudMaterial    = new THREE.MeshPhongMaterial({
              map     : new THREE.Texture(textureResult),
              side        : THREE.DoubleSide,
              transparent : true,
              opacity     : 0.8,
          });

          const cloudMesh  = new THREE.Mesh(cloudGeometry, cloudMaterial);
          const planetMesh  = new THREE.Mesh(geometry, material);

          planetMesh.add(cloudMesh);

         // planetMesh.rotation.z = -23 * Math.PI / 180;
          planetMesh.rotateOnAxis(new THREE.Vector3(0,0,1), -23 * Math.PI / 180);

          const count = .2;
          planetMesh.animation = function (){
              planetMesh.rotateOnAxis(new THREE.Vector3(0,1,0), count * Math.PI / 180);
          };

          return  planetMesh ;
        }
      },{
        name: "Mars",
        createObject: function(){ 
          const geometry = new THREE.SphereGeometry(0.5, 32, 32);

          const material = new THREE.MeshPhongMaterial({
              map: THREE.ImageUtils.loadTexture('images/planets/marsmap1k.jpg'),
              bumpMap: THREE.ImageUtils.loadTexture('images/planets/marsbump1k.jpg'),
              bumpScale: .05
          });

          const mars = new THREE.Mesh(geometry, material);
          mars.rotateOnAxis(new THREE.Vector3(0,0,1), -25 * Math.PI / 180);

          const speed = .2;
          mars.animation = function (){
            mars.rotateOnAxis(new THREE.Vector3(0,1,0), speed * Math.PI / 180);
          };

          return mars;

        }
      },{
        name: "Jupiter",
        createObject: function(){ 
          const radius = .5;
          const geometry = new THREE.SphereGeometry(radius, 32, 32);

          const material = new THREE.MeshPhongMaterial({
              map:THREE.ImageUtils.loadTexture('images/planets/jupiter2_2k.jpg')
          });

          const ringTexture = service.createTransparentImage('images/planets/saturnringcolor.jpg', 'images/planets/saturnringpattern.gif', function(){
              if (ringMaterial && ringMaterial.map){
                  ringMaterial.map.needsUpdate = true;
              }
          });

          const innerRadius = radius +.25,
              outerRadius = radius + .42,
              ringThetaSegments = 64,
              ringPhiSegments = 8;

          const ringGeometry = service.createRingGeometry(innerRadius, outerRadius, ringThetaSegments, ringPhiSegments);
          
          const ringMaterial = new THREE.MeshPhongMaterial({
              map: new THREE.Texture(ringTexture),
              side: THREE.DoubleSide,
              transparent:true,
              opacity: .4
          });
          ringGeometry.faceVertexUvs[0].push( new THREE.Vector2( 
              innerRadius/(ringThetaSegments-1), outerRadius/ (ringPhiSegments-1) ) );

          const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
          const planetMesh = new THREE.Mesh(geometry, material);
          ringMesh.lookAt(new THREE.Vector3(0,1,0));


          ringMesh.receiveShadow = true;
          ringMesh.castShadow = true;
          planetMesh.receiveShadow = true;
          planetMesh.castShadow=  true;
          planetMesh.add(ringMesh);

          const speed = .2;

          planetMesh.rotateOnAxis(new THREE.Vector3(0,0,1), -3 * Math.PI / 180);

          planetMesh.animation = function (){
              this.rotateOnAxis(new THREE.Vector3(0,1,0), speed * Math.PI / 180);
          };

          return  planetMesh;
        }
      },{
        name: "Saturn",
        createObject: function(){
          const radius = .5;
          const geometry = new THREE.SphereGeometry(radius, 32, 32);
          const material = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('images/planets/saturnmap.jpg')
          });

          const ringTexture = service.createTransparentImage('images/planets/saturnringcolor.jpg', 'images/planets/saturnringpattern.gif', function(){
            if (ringMaterial && ringMaterial.map){
              ringMaterial.map.needsUpdate = true;
            }
          });

          const innerRadius = radius +.1,
              outerRadius = radius + .7,
              ringThetaSegments = 64,
              ringPhiSegments = 8;

          const ringGeometry = service.createRingGeometry(innerRadius, outerRadius, ringThetaSegments, ringPhiSegments);

          const ringMaterial = new THREE.MeshPhongMaterial({
            map: new THREE.Texture(ringTexture),
            side: THREE.DoubleSide,
            transparent:true,
            opacity: .9
          });
          ringGeometry.faceVertexUvs[0].push( new THREE.Vector2( 
              innerRadius/(ringThetaSegments-1), outerRadius/ (ringPhiSegments-1) ) );

          const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
          const planetMesh = new THREE.Mesh(geometry, material);
          ringMesh.lookAt(new THREE.Vector3(0,1,0));


          ringMesh.receiveShadow = true;
          ringMesh.castShadow = true;
          planetMesh.receiveShadow = true;
          planetMesh.castShadow=  true;
          planetMesh.add(ringMesh);

          planetMesh.rotateOnAxis(new THREE.Vector3(0,0,1), -26 * Math.PI / 180);
          const speed = .2;

          planetMesh.animation = function (){
            this.rotateOnAxis(new THREE.Vector3(0,1,0), speed * Math.PI / 180);
          };

          return  planetMesh;
        }
      },{
        name: "Uranus",
        createObject: function(){
          const radius = .5;
          const geometry = new THREE.SphereGeometry(radius, 32, 32);

          const material =  new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture("images/planets/uranusmap.jpg"),
            bumpMap:THREE.ImageUtils.loadTexture("images/planets/uranusmap.jpg"),
            bumpScale:.005,
            castShadow:true,
            createShadow:true
          });

          let ringGeometry = new THREE.RingGeometry(radius + .01, radius + .5,  10);

          const ringTexture = service.createTransparentImage('images/planets/uranusringcolour.jpg', 'images/planets/uranusringtrans.gif', function(){
            if (ringMaterial && ringMaterial.map){
              ringMaterial.map.needsUpdate = true;
            }
          });

          const innerRadius = radius +.1,
              outerRadius = radius + .4,
              ringThetaSegments = 64,
              ringPhiSegments = 8;

          ringGeometry = service.createRingGeometry(innerRadius, outerRadius, ringThetaSegments, ringPhiSegments);

          const ringMaterial = new THREE.MeshPhongMaterial({
            map: new THREE.Texture(ringTexture),
            side: THREE.DoubleSide,
            transparent:true,
            opacity: .9
          });
          ringGeometry.faceVertexUvs[0].push( new THREE.Vector2( 
              innerRadius/(ringThetaSegments-1), outerRadius/ (ringPhiSegments-1) ) );

          const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
          const planetMesh = new THREE.Mesh(geometry, material);
          ringMesh.lookAt(new THREE.Vector3(0,1,0));


          ringMesh.receiveShadow = true;
          ringMesh.castShadow = true;
          planetMesh.receiveShadow = true;
          planetMesh.castShadow=  true;
          planetMesh.add(ringMesh);

          planetMesh.rotateOnAxis(new THREE.Vector3(0,0,1), -97 * Math.PI / 180);
          const speed = .2;

          planetMesh.animation = function (){
            this.rotateOnAxis(new THREE.Vector3(0,1,0), -speed * Math.PI / 180);
          };

          return  planetMesh;
        }
      },{
        name: "Neptune",
        createObject: function(){
          const geometry = new THREE.SphereGeometry(0.5, 32, 32);

          const material = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture("images/planets/neptunemap.jpg")
          });

          const neptune = new THREE.Mesh(geometry, material);

          neptune.rotateOnAxis(new THREE.Vector3(0,0,1), -28 * Math.PI / 180);
          const speed = .2;

          neptune.animation = function (){
            this.rotateOnAxis(new THREE.Vector3(0,1,0), speed * Math.PI / 180);
          };


          return neptune;
        }
      },{
        name: "Pluto",
        createObject: function(){
          const geometry = new THREE.SphereGeometry(0.5, 32, 32);
          const material = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('images/planets/plutomap1k.jpg'),
            bumpMap: THREE.ImageUtils.loadTexture('images/planets/plutobump1k.jpg'),
            bumpScale: .005
          });

          const pluto = new THREE.Mesh(geometry, material);

          pluto.rotateOnAxis(new THREE.Vector3(0,0,1), -122 * Math.PI / 180);
          const speed = .2;

          pluto.animation = function (){
            this.rotateOnAxis(new THREE.Vector3(0,1,0), -speed * Math.PI / 180);
          };

          return pluto;
        }
      },{
        name: "Moon",
        createObject: function(){
          const geometry = new THREE.SphereGeometry(0.5, 32, 32);
          const material = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('images/planets/moonmap2k.jpg'),
            bumpMap: THREE.ImageUtils.loadTexture('images/planets/moonbump2k.jpg'),
            bumpScale: .005
          });

          const moon = new THREE.Mesh(geometry, material);
          moon.rotateOnAxis(new THREE.Vector3(0,0,1), -6.68 * Math.PI / 180);
          const speed = .2;
          moon.animation = function (){
            this.rotateOnAxis(new THREE.Vector3(0,1,0), speed * Math.PI / 180);
          };

          return moon;
        }
      }
      ];
  }
}

export default PlanetService;
