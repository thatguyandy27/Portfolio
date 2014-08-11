'use strict';

angular.module('portfolioApp').
    factory('gameService', ['pieceService', function(pieceService){

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
   
    }

    function newGame(player1, player2){
        return new Game();
    }

    return {
        newGame: newGame
    };
}]);


