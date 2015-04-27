'use strict';

angular.module('portfolioApp').
    factory('planetService', [function(){

    function retrieveAll(){
        return [{
            name:"Sun",
            getMaterial: function(){ return new THREE.MeshBasicMaterial({map:
                THREE.ImageUtils.loadTexture('images/planets/sunmap.jpg')})}

        },{
            name:"Mercury",
            getMaterial: function(){
                return new THREE.MeshPhongMaterial({
                map: THREE.ImageUtils.loadTexture('images/planets/mercurymap.jpg'),
                bumpMap: THREE.ImageUtils.loadTexture('images/planets/mercurybump.jpg'),
                bumpScale:.05
            })}
        },{
            name: "Venus",
            getMaterial: function(){ return new THREE.MeshPhongMaterial({
                map: THREE.ImageUtils.loadTexture('images/planets/venusmap.jpg'),
                bumpMap: THREE.ImageUtils.loadTexture('images/planets/venusbump.jpg'),
                bumpScale: .05
            })}
        },{
            name: "Earth",
            getMaterial: function(){ return new THREE.MeshPhongMaterial({
                map: THREE.ImageUtils.loadTexture('images/planets/earthmap1k.jpg'),
                bumpMap: THREE.ImageUtils.loadTexture('images/planets/earthbump1k.jpg'),
                bumpScale: .05
            })}
        },{
            name: "Mars",
            getMaterial: function(){ return new THREE.MeshPhongMaterial({
                map: THREE.ImageUtils.loadTexture('images/planets/marsmap1k.jpg'),
                bumpMap: THREE.ImageUtils.loadTexture('images/planets/marsbump1k.jpg'),
                bumpScale: .05
                })
            }
        },{
            name: "Jupiter",
            getMaterial: function(){ return new THREE.MeshPhongMaterial({
                map:THREE.ImageUtils.loadTexture('images/planets/jupiter2_2k.jpg')
                })
            }
        },{
            name: "Saturn",
            getMaterial: function(){
                return new THREE.MeshPhongMaterial({
                    map: THREE.ImageUtils.loadTexture('images/planets/saturnmap.jpg')
                })
            }
        },{
            name: "Uranus",
            getMaterial: function(){
                return new THREE.MeshPhongMaterial({
                    map: THREE.ImageUtils.loadTexture("images/planets/uranusmap.jpg")
                })
            }
        },{
            name: "Neptune",
            getMaterial: function(){
                return new THREE.MeshPhongMaterial({
                    map: THREE.ImageUtils.loadTexture("images/planets/neptunemap.jpg")
                })
            }
        },{
            name: "Pluto",
            getMaterial: function(){
                return new THREE.MeshPhongMaterial({
                    map: THREE.ImageUtils.loadTexture('images/planets/plutomap1k.jpg'),
                    bumpMap: THREE.ImageUtils.loadTexture('images/planets/plutobump1k.jpg'),
                    bumpScale: .05
                })
            }
        }
        ];
    }

    return {
        retrieveAll: retrieveAll
    };

}]);