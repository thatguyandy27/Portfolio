angular.module('portfolioApp').
    factory('playerService', [function(){


    function LocalPlayer(options){
        this.isUserLocal= function isUserLocal(){
            return true;
        };
        this.name = options.name || ":(";
        
    }



    function createPlayer(playerType, options){
        switch (playerType){
            case "local":
                return new LocalPlayer(options);
            break;
            default:
                return "ARRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR";
        }

        return null;
    }

    return {
        createPlayer: createPlayer,
        PLAYER_TYPES: ["local", "socket", "wrtc", "ai"]
    };
}]);