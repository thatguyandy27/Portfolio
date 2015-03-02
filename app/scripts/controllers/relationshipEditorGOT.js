'use strict';

/**
 * @ngdoc function
 * @name portfolioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the portfolioApp
 */
angular.module('portfolioApp')
    .controller('relationshipEditorGOTCtrl', ['$scope', 'sixDegreesOfWesterosService', function ($scope, sixDegreesOfWesterosService) {

    $scope.newHouse = null;
    $scope.newRelationship = null;
    $scope.selectedChar = null;
    $scope.isLoading = true;
    $scope.links = [];
    $scope.charJSON = '';
    $scope.linkJSON = '';

    var characterService  = sixDegreesOfWesterosService.getCharacterService();

    characterService.retrieveData().then(function(responses){
        $scope.characters = characterService.characters;
        $scope.selectedChar= $scope.characters[0];
        loadLinks();
    });

    $scope.$watch('selectedChar', function(){
        loadLinks();
    });


    function loadLinks(){
        if ($scope.selectedChar == null){
            return;
        }
        var charId = $scope.selectedChar.id;
        $scope.links = characterService.retrieveCharacterLinks(charId);
    //     for(var i=0; i < $scope.links.length; i++){
    //         var link = $scope.links[i];
    //         if (charId == link.id1 ){
    //             link.target = characterService.characters[link.id1];
    //         }
    //         else{
    //             link.target = characterService.characters[link.id2];
    //         }

    //     }
    }

    $scope.exportJSON = function(){

        characterService.saveData();

        $scope.charJSON = angular.toJson(characterService.characters);

        $scope.linkJSON = angular.toJson(characterService.links);

    };

    $scope.addNew = function(){
        var newLink = {
            id1:$scope.selectedChar.id,
            id2:$scope.newChar.id,
            type: $scope.newRelationship
        };

        $scope.newRelationship = null;
        $scope.newChar = null;
        $scope.links.push(newLink);
        characterService.links.push(newLink);

    };

    $scope.getLinkName = function(link){
        if ($scope.selectedChar.id == link.id1){
            return characterService.characters[link.id2].name;
        }
        else
            return characterService.characters[link.id1].name;
    };

    $scope.getLinkHouse = function(link){
        if ($scope.selectedChar.id == link.id1){
            return characterService.characters[link.id2].house;
        }
        else
            return characterService.characters[link.id1].house;

    };

    $scope.getImage = function(link){
        var character;
        if (link== undefined){
            character = $scope.selectedChar;

        }
        else{
            if ($scope.selectedChar.id == link.id1){
                character = characterService.characters[link.id2];
            }
            else{
                character = characterService.characters[link.id1];
            }
        }

        if(character == null){
            return null;
        }
        
        if (character.image != 'none')
            return "http://awoiaf.westeros.org/" + character.image;
        else{   
            return "http://awoiaf.westeros.org/images/thumb/e/e7/Map_of_westeros.jpg/264px-Map_of_westeros.jpg";
        }
    };

    $scope.moveUp = function(link, index){ 
        var previousLink = $scope.links[index - 1];
        
        swapLinks(link, previousLink, index, index -1);

    };

    $scope.linkTypeChange = function(link, index){
        if (link.type){
            var links = $scope.links;
            for(var i = 0; i < links.length; i++){
                var linkToMove = links[i];
                if (!linkToMove.type){
                    swapLinks(link, linkToMove, index, i);
                    break;
                }
            }
        }
    };



    function swapLinks(link1, link2, index1, index2){
        $scope.links[index1] = link2;
        $scope.links[index2] = link1;

        var links = characterService.links;
        var indexPrevious = null, 
            indexCurrent = null;

        for(var i = 0; i < links.length; i++){
            if (links[i] == link1){
                indexCurrent = i;
                if (indexPrevious != null){
                    links[indexPrevious] = link1;
                    links[indexCurrent] = link2;
                    break;
                }
            }
            else if (links[i] == link2){
                indexPrevious = i;
                if (indexCurrent != null){
                    links[indexPrevious] = link1;
                    links[indexCurrent] = link2;
                    break;
                }

            }
        }
    }

    $scope.deleteLink = function(link){
        var links = characterService.links;
        
        // remove from links
        for (var i = links.length - 1; i >= 0; i--) {
            if (links[i] == link){
                links.splice(i, 1);
                break;
            }
        };

        // remove from temp array
        links = $scope.links;
        for (var i = links.length - 1; i >= 0; i--) {
            if (links[i] == link){
                links.splice(i, 1);
                break;
            }
        };
    };

    $scope.deleteRecord = function deleteRecord(){
        if (window.confirm("Are you sure you wish to delete?")){
            var character = $scope.selectedChar;

            characterService.deleteRecord(character);

            var newCharSelection = $scope.selectedChar.id;
            if (newCharSelection >= $scope.characters.length){
                newCharSelection = $scope.characters.length - 1;
            }


            $scope.selectedChar = $scope.characters[newCharSelection];
        }

    };

}]);