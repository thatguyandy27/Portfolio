'use strict';

angular.module('portfolioApp').
    factory('sixDegreesOfWesterosService', ['$q', '$http', function($q, $http){

    var chracterDataUrl = '../../data/got/nodes.json',
        linksUrl = '../../data/got/links.json';

    //links:{
    // id2: int,
    // id1: int,
    // type: int (related/married/etc.)
    //}

    //nodes:{
    // name: text,
    // image: url,
    // id: ID,
    // house: house
    // link: url
    //}

    function CharacterService(){

    }

    CharacterService.prototype.retrieveData = function retrieveData(){

        var service = this;

        return $q.all([
            $http.get(chracterDataUrl),
            $http.get(linksUrl),
        ]).then(function(responses){

            service.characters = responses[0].data;
            service.links = responses[1].data;

            return responses;
        });
    };

    CharacterService.prototype.retrieveChracterLinks = function retrieveChracterLinks(chracterId, existingLinks){
        existingLinks = existingLinks || [];

        var links = this.links,
            index = 0,
            length = links.length,
            chracterLinks = [],
            found = false;

        // loop through all link
        for(index = 0; index < length; index++ ){
            var link = links[index];

            // does the id match
            if (link.id1 == chracterId || link.id2 == chracterId){
                found = false;

                // check to see if the link already exists
                for(var j = 0; j < existingLinks.length; j++){
                    // if match then break;
                    if (existingLinks[j] == link){
                        found = true;
                        break;
                    }
                }

                // if not found then 
                if (!found){
                    chracterLinks.push(link);
                }

            }
        }

        return chracterLinks;

    };

    CharacterService.prototype.findLinkBetweenCharacters = function findLinkBetweenCharacters(char1, char2){
        if (char1 == char2) return[];

        var paths = [],
            indexesUsed =[],
            found = false,
            links = this.retrieveChracterLinks(char1);

       // indexesUsed[char1] = true;

        for (var i = links.length - 1; i >= 0; i--) {
            paths.push([links[i]]);
        };

        while (paths.length > 0){
            var path = paths.shift();

            var currentNode = path[path.length - 1];

            if (currentNode.id1 == char2 || currentNode.id2 == char2){
                return path;
            }

            links = [];

            if (!indexesUsed[currentNode.id1] ){
                indexesUsed[currentNode.id1]= true;
                links = this.retrieveChracterLinks(currentNode.id1);

            }
            else if (!indexesUsed[currentNode.id2]){
                indexesUsed[currentNode.id2]= true;
                links = this.retrieveChracterLinks(currentNode.id2);
            }

            //copy the current path and add one for each new node to explore. 

            for(var j = 0; j < links.length; j++){
                var newPath = path.slice(0, path.length);
                newPath.push(links[j]);
                paths.push(newPath);
            }
        }

        return null

    };

    return {
        getCharacterService: function(){ return new CharacterService();}
    };
}]);