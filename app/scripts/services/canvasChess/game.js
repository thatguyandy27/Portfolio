'use strict';

angular.module('portfolioApp').
    factory('gameService', ['pieceService', function(pieceService){

    var _kingType = "king";

    function findPlaceOnBoard(piece, board){
        for( var y = 0; y < board.length; y++){
            var row = board[y];
            for (var x=0; x < row.length; x++){
                if (piece === row[x]){
                    return {x:x, y:y};
                }
            }
        }

        return null;
    }


    function findPiece(pieceType, player, board){
        for( var y = 0; y < board.length; y++){
            var row = board[y];
            for (var x=0; x < row.length; x++){
                if (piece.getType() === pieceType  && player === piece.player){
                    return {x:x, y:y};
                }
            }
        }

        return null;
    }

    function Game(player1, player2){
        this.player1 = player1;
        this.player2 = player2;
        this.board = [
            [new window.Rook(player2), new window.Knight(player2), new window.Bishop(player2), new window.Queen(player2),
            new window.King(player2), new window.Bishop(player2), new window.Knight(player2), new window.Rook(player2)],
            [new window.Pawn(player2),new window.Pawn(player2),new window.Pawn(player2),new window.Pawn(player2),
            new window.Pawn(player2),new window.Pawn(player2),new window.Pawn(player2),new window.Pawn(player2)],
            [null, null, null, null,null, null, null, null],
            [null, null, null, null,null, null, null, null],
            [null, null, null, null,null, null, null, null],
            [null, null, null, null,null, null, null, null],
            [new window.Pawn(player1),new window.Pawn(player1),new window.Pawn(player1),new window.Pawn(player1),
            new window.Pawn(player1),new window.Pawn(player1),new window.Pawn(player1),new window.Pawn(player1)],
            [new window.Rook(player1), new window.Knight(player1), new window.Bishop(player1), new window.Queen(player1) ,
            new window.King(player1), new window.Bishop(player1), new window.Knight(player1), new window.Rook(player1)]];

        this.activePlayer = player1;
   
    }

    function isPlayerInCheck(player, board){
        var king = findPiece(_kingType, player, board);

        //enumerate 


    }

    function getValidMovesOnBoard(x, y, game){
        var piece = game.board[y][x];
        var validMoves = null;

        if (piece === null){
            return null;
        }
        switch(piece.getType()){
            case "pawn":
                validMoves = getPawnMoves(x,y, game);
                break;
            case "knight":
                validMoves = getKnightMoves(x,y,game);
                break;
            case "rook":
                validMoves = getRookMoves(x,y,game);
                break;
            case "bishop":
                validMoves = getBishopMoves(x,y,game);
                break;
            case "queen":
                validMoves = getQueenMoves(x,y,game);
                break;
            case "king":
                validMoves = getKingMoves(x,y,game);
                break;
        }

        return validMoves;

    }

    function getPawnMoves(x,y,game){
        var piece = game.board[y][x];
        var moves = [];

        var direction = 1,
            startingRank =1;

        //direction matters.  Assume player 1 goes up, and player 2 goes down.
        if (piece.player !== game.player1){
            startingRank = 6;
            direction = -1;
            
        }

        //move one spot
        if (game.board[y+ direction][x] === null){
            moves.push({y:y+direction, x:x});

            //move two spaces if starting rank
            if(y === startingRank && game.board[y+ (2* direction)][x] === null){
                moves.push({y:y + (2* direction), x:x});
            }

            //TODO ENPASSANT

        }
        // attacking left!
        if(x > 0 && game.board[y+ direction][x - 1] === null){
            moves.push({y:y+direction, x:x - 1});
        }
        // attacking right!
        if(x < 7 && game.board[y+ direction][x + 1] === null){
            moves.push({y:y+direction, x:x + 1});
        }

        return moves;
    }

    function getRookMoves(x,y,game){
        var piece = game.board[y][x],
            moves= [],
            xIndex = x,
            yIndex = y,
            currentPosition = null;

        // check left
        for(xIndex =  x - 1; xIndex >= 0; xIndex--){
            currentPosition = game.board[yIndex][xIndex];
            if (currentPosition === null){
                moves.push({y:yIndex, x:xIndex});
            }
            else{
                // if other piece then you can capture.
                if (currentPosition.player !== piece.player){
                    moves.push({y:yIndex, x:xIndex});
                }
                break;
            }
        }
        // check right
                // check left
        for(xIndex =  x + 1 ; xIndex <= 7; xIndex++){
            currentPosition = game.board[yIndex][xIndex];
            if (currentPosition === null){
                moves.push({y:yIndex, x:xIndex});
            }
            else{
                // if other piece then you can capture.
                if (currentPosition.player !== piece.player){
                    moves.push({y:yIndex, x:xIndex});
                }
                break;
            }
        }
        xIndex = x;
        // check up 
        for(yIndex =  y + 1; yIndex >= 0; yIndex++){
            currentPosition = game.board[yIndex][xIndex];
            if (currentPosition === null){
                moves.push({y:yIndex, x:xIndex});
            }
            else{
                // if other piece then you can capture.
                if (currentPosition.player !== piece.player){
                    moves.push({y:yIndex, x:xIndex});
                }
                break;
            }
        }

        // check down
        for(yIndex =  y - 1; yIndex >= 0; yIndex--){
            currentPosition = game.board[yIndex][xIndex];
            if (currentPosition === null){
                moves.push({y:yIndex, x:xIndex});
            }
            else{
                // if other piece then you can capture.
                if (currentPosition.player !== piece.player){
                    moves.push({y:yIndex, x:xIndex});
                }
                break;
            }
        }
    }
    
    
    function getBishopMoves(x,y,game){
        var piece = game.board[y][x],
            moves= [],
            xIndex = x,
            yIndex = y,
            currentPosition = null;

        // check upperleft
        xIndex = x - 1;
        yIndex = y - 1;
        while(xIndex >= 0 && yIndex >= 0)
            currentPosition = game.board[yIndex][xIndex];
            if (currentPosition === null){
                moves.push({y:yIndex, x:xIndex});
            }
            else{
                // if other piece then you can capture.
                if (currentPosition.player !== piece.player){
                    moves.push({y:yIndex, x:xIndex});
                }
                break;
            }
            xIndex--;
            yIndex--;

        }
 
        // check upper right
        xIndex = x + 1;
        yIndex = y - 1;
        while(xIndex <= 7 && yIndex >= 0)
            currentPosition = game.board[yIndex][xIndex];
            if (currentPosition === null){
                moves.push({y:yIndex, x:xIndex});
            }
            else{
                // if other piece then you can capture.
                if (currentPosition.player !== piece.player){
                    moves.push({y:yIndex, x:xIndex});
                }
                break;
            }
            xIndex++;
            yIndex--;

        }
        
        // check lower left
        xIndex = x - 1;
        yIndex = y + 1;
        while(xIndex >= 0 && yIndex <= 7)
            currentPosition = game.board[yIndex][xIndex];
            if (currentPosition === null){
                moves.push({y:yIndex, x:xIndex});
            }
            else{
                // if other piece then you can capture.
                if (currentPosition.player !== piece.player){
                    moves.push({y:yIndex, x:xIndex});
                }
                break;
            }
            xIndex--;
            yIndex++;

        }

        // check lower right
        xIndex = x + 1;
        yIndex = y + 1;
        while(xIndex <= 7 && yIndex <= 7)
            currentPosition = game.board[yIndex][xIndex];
            if (currentPosition === null){
                moves.push({y:yIndex, x:xIndex});
            }
            else{
                // if other piece then you can capture.
                if (currentPosition.player !== piece.player){
                    moves.push({y:yIndex, x:xIndex});
                }
                break;
            }
            xIndex++;
            yIndex++;

        }
    }

    function getKingMoves(x,y,game){
        var piece = game.board[y][x],
            moves= [],
            xIndex = x,
            yIndex = y,
            currentPosition = null;

        //upperleft
        if (x > 0 && y > 0){
            currentPosition = game.board[y -1][x - 1];
            if (currentPosition === null || currentPosition.player !== piece.player ){
                moves.push({y: y -  1, x: x -1});
            }
        }

        //up
        if (y > 0){
            currentPosition = game.board[y -1][x];
            if (currentPosition === null || currentPosition.player !== piece.player ){
                moves.push({y: y -  1, x: x });
            }
        }

        //upper right
        if (x < 7 && y > 0){
            currentPosition = game.board[y -1][x + 1];
            if (currentPosition === null || currentPosition.player !== piece.player ){
                moves.push({y: y -  1, x: x +1});
            }
        }

        // right
        if (x < 7 ){
            currentPosition = game.board[y ][x + 1];
            if (currentPosition === null || currentPosition.player !== piece.player ){
                moves.push({y: y, x: x +1});
            }
        }

        //bottom right
        if (x < 7 && y < 7){
            currentPosition = game.board[y +1][x + 1];
            if (currentPosition === null || currentPosition.player !== piece.player ){
                moves.push({y: y +  1, x: x +1});
            }
        }

        //bottom
        if (y < 7){
            currentPosition = game.board[y +1][x];
            if (currentPosition === null || currentPosition.player !== piece.player ){
                moves.push({y: y +  1, x: x });
            }
        }

        //bottom left
        if (x > 0 && y < 7){
            currentPosition = game.board[y +1][x - 1];
            if (currentPosition === null || currentPosition.player !== piece.player ){
                moves.push({y: y +  1, x: x -1});
            }
        }

        //left
        if (x > 0){
            currentPosition = game.board[y ][x - 1];
            if (currentPosition === null || currentPosition.player !== piece.player ){
                moves.push({y: y , x: x -1});
            }
        }

    }

    function getQueenMoves(x,y, game){
        var rookMoves = getRookMoves(x,y,game);
        var bishopMoves = getBishopMoves(x,y,game);
        return bishopMoves.concat(rookMoves);
    }

    function getKnightMoves(x,y, game){
        var piece = game.board[y][x],
            spot = null,
            moves = [];
        
        // left 2 up 1
        if (x >= 2 && y <= 6){
            spot = game.board[y +  1][x - 2];
            if (spot === null || spot.player != piece.player){
                moves.push({y: y +  1, x: x - 2});
            }
        }

        // left 1 up 2
        if (x >= 1 && y <= 5){
            spot = game.board[y +  2][x - 1];
            if (spot === null || spot.player != piece.player){
                moves.push({y: y +  2, x: x - 1});
            }
        }
        
        // right 1 up 2
        if (x <= 6 && y <= 5){
            spot = game.board[y +  2][x + 1];
            if (spot === null || spot.player != piece.player){
                moves.push({y: y + 2, x: x + 1});
            }
        }

        // right 2 up 1
        if (x <= 5 && y <= 6){
            spot = game.board[y +  1][x + 2];
            if (spot === null || spot.player != piece.player){
                moves.push({y: y + 1, x: x + 2});
            }
        }

        // right 2 down 1
        if (x <= 5 && y >= 1){
            spot = game.board[y -  1][x + 2];
            if (spot === null || spot.player != piece.player){
                moves.push({y: y - 1, x: x + 2});
            }
        }

        // right 1 down 2
        if (x <= 6 && y >= 2){
            spot = game.board[y - 2][x + 1];
            if (spot === null || spot.player != piece.player){
                moves.push({y: y - 2, x: x + 1});
            }
        }

        // left 1 down 2
        if (x >= 1 && y >= 2){
            spot = game.board[y - 2][x - 1];
            if (spot === null || spot.player != piece.player){
                moves.push({y: y - 2, x: x - 1});
            }
        }
        // left 2 down 1
        if (x >= 2 && y >= 1){
            spot = game.board[y - 1][x - 2];
            if (spot === null || spot.player != piece.player){
                moves.push({y: y - 1, x: x - 2});
            }
        }

        return moves;
    }

    Game.prototype = {
        canMovePiece: function canMovePiece(piece){
            return (this.activePlayer == piece.player);
        },
        getValidMovesForPiece: function getValidMovesForPiece(x, y){
            return getValidMovesOnBoard(x,y this);

        }
    };


    function newGame(player1, player2){
        return new Game();
    }

    return {
        newGame: newGame
    };
}]);


