'use strict';


angular.module('portfolioApp').
    controller('transparentImageDemoCtrl', ['$scope', '$timeout', function($scope, $timeout){

    $scope.mergeProperties ={
        x:0,
        y:0,
        offset:0,
        speed:100  
    };

    var alphaImageUrl = 'images/planets/earthcloudmaptrans.jpg',
        sourceImageUrl = 'images/planets/earthcloudmap.jpg';

    var sourceCanvas = document.getElementById('source'),
        alphaCanvas = document.getElementById('alpha'),
        destinationCanvas = document.getElementById('destination');

    var sourceContext = sourceCanvas.getContext('2d'),
        alphaContext = alphaCanvas.getContext('2d'),
        destinationContext = destinationCanvas.getContext('2d');

    var sourceImg,
        alphaImg;

    function startOverlay(){
        destinationContext.clearRect(0,0, destinationCanvas.height, destinationCanvas.width);
        
        var sourceData = sourceContext.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height),
            alphaData = alphaContext.getImageData(0,0, alphaCanvas.width, alphaCanvas.height),
            destinationData = destinationContext.getImageData(0,0, destinationCanvas.width, destinationCanvas.height);

        var mergeProperties = $scope.mergeProperties;
        mergeProperties.x = 0;
        mergeProperties.y = 0;
        mergeProperties.offset = 0;
        
        function mergeImages(){

            for(var i = 0; i < mergeProperties.speed; i++){

                destinationData.data[mergeProperties.offset+0]  = sourceData.data[mergeProperties.offset+0];
                destinationData.data[mergeProperties.offset+1]  = sourceData.data[mergeProperties.offset+1];
                destinationData.data[mergeProperties.offset+2]  = sourceData.data[mergeProperties.offset+2];
                destinationData.data[mergeProperties.offset+3]  = 255 -  alphaData.data[mergeProperties.offset+0];

                mergeProperties.x++;
                mergeProperties.offset+=4;
                if (mergeProperties.x >= sourceImg.width){
                    mergeProperties.x = 0;
                    mergeProperties.y++;
                }
                if (mergeProperties.y >= sourceImg.height){
                    destinationContext.putImageData(destinationData,0,0);    
                    return;
                }
            }

            destinationContext.putImageData(destinationData,0,0);    
            $timeout(mergeImages, 10);

        }
        
        mergeImages();
    }


    function loadImages(sourceImageUrl, alphaImageUrl){
        sourceImg = new Image();
        sourceImg.addEventListener("load", function(){
            sourceCanvas.height = sourceImg.height;
            sourceCanvas.width = sourceImg.width;
            sourceContext.drawImage(sourceImg, 0,0);
            
            alphaImg = new Image();
            alphaImg.addEventListener('load', function(){
                alphaCanvas.height = alphaImg.height;
                alphaCanvas.width = alphaImg.width;
                alphaContext.drawImage(alphaImg, 0, 0);
                
                startOverlay();
            
            });

            alphaImg.src = alphaImageUrl;
        });
        sourceImg.src = sourceImageUrl;
    }

    loadImages(sourceImageUrl, alphaImageUrl);

}])