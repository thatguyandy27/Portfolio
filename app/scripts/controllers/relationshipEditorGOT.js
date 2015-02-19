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
        var charId = $scope.selectedChar.id;
        links = characterService.retrieveChracterLinks(charId);
        for(var i=0; i < links.length; i++){
            links[i].target = 
        }
    }

    $scope.exportJSON = function(){

        $scope.charJSON = JSON.stringify(characterService.characters);

        $scope.linkJSON = JSON.stringify(characterService.links);

    };

    $scope.addNew = function(){
        var newLink = {
            id1:$scope.selectedChar.id,
            id2:$scope.newChar.id,
            type: $scope.newRelationship
        };

    };

    $scope.getLinkName = function(link){
        if (selectedChar.id == link.id1){
            return characterService[link.id1].name;
        }
        else
            return characterService[link.id2].name;
    };

    $scope.getLinkHouse = function(link){
        if (selectedChar.id == link.id1){
            return characterService[link.id1].house;
        }
        else
            return characterService[link.id2].house;

    }

}]);