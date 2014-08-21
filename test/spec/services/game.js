'use strict';

describe('Service - canvasChess: gameService', function () {

    // load the controller's module
    beforeEach(module('portfolioApp'));

    var gameService, 
        game,
        pieceService, 
        player1,
        player2;

    beforeEach(function(){
        player1 = {};
        player2 = {};

        inject(function($injector){
            gameService = $injector.get('gameService');
            pieceService = $injector.get('pieceService');
        });

        game = gameService.newGame(player1, player2);
    });

    describe("Get all of player1's opening valid moves", function(){

        it("should allow all pawns to move 1 or 2 spaces", function(){
            for(var i = 0; i < 8; i++){
                var moves = game.getValidMovesForPiece(i, 6);
                expect(moves.length).toBe(2);
                expect(moves).toContain({x:i, y:5});
                expect(moves).toContain({x:i, y:4});
            }
        });

        it("should not allow the king to move", function(){
            var moves = game.getValidMovesForPiece(4, 7);
            expect(moves.length).toBe(0);
        });

        it("should not allow the queen to move", function(){
            var moves = game.getValidMovesForPiece(3, 7);
            expect(moves.length).toBe(0);
        });

        it("should not allow the bishops to move", function(){
            var moves = game.getValidMovesForPiece(2, 7);
            expect(moves.length).toBe(0);

            moves = game.getValidMovesForPiece(5, 7);
            expect(moves.length).toBe(0);
        });

        it("should not allow the knights to move", function(){
            var moves = game.getValidMovesForPiece(1, 7);
            expect(moves.length).toBe(2);
            expect(moves).toContain({x:0, y:5});
            expect(moves).toContain({x:2, y:5});

            moves = game.getValidMovesForPiece(6, 7);
            expect(moves.length).toBe(2);
            expect(moves).toContain({x:5, y:5});
            expect(moves).toContain({x:7, y:5});

        });

        it("should not allow the rooks to move", function(){
            var moves = game.getValidMovesForPiece(0, 7);
            expect(moves.length).toBe(0);

            moves = game.getValidMovesForPiece(0, 7);
            expect(moves.length).toBe(0);
        });
    });

    describe("Get all of player2's opening valid moves", function(){
        beforeEach(function(){

        });

        it("should allow all pawns to move 1 or 2 spaces", function(){
            for(var i = 0; i < 8; i++){
                var moves = game.getValidMovesForPiece(i, 1);
                expect(moves.length).toBe(2);
                expect(moves).toContain({x:i, y:2});
                expect(moves).toContain({x:i, y:3});
            }
        });

        it("should not allow the king to move", function(){
            var moves = game.getValidMovesForPiece(4, 0);
            expect(moves.length).toBe(0);
        });

        it("should not allow the queen to move", function(){
            var moves = game.getValidMovesForPiece(3, 0);
            expect(moves.length).toBe(0);
        });

        it("should not allow the bishops to move", function(){
            var moves = game.getValidMovesForPiece(2, 0);
            expect(moves.length).toBe(0);

            moves = game.getValidMovesForPiece(5, 0);
            expect(moves.length).toBe(0);
        });

        it("should not allow the knights to move", function(){
            var moves = game.getValidMovesForPiece(1, 0);
            expect(moves.length).toBe(2);
            expect(moves).toContain({x:0, y:2});
            expect(moves).toContain({x:2, y:2});

            moves = game.getValidMovesForPiece(6, 0);
            expect(moves.length).toBe(2);
            expect(moves).toContain({x:5, y:2});
            expect(moves).toContain({x:7, y:2});

        });

        it("should not allow the rooks to move", function(){
            var moves = game.getValidMovesForPiece(0, 0);
            expect(moves.length).toBe(0);

            moves = game.getValidMovesForPiece(0, 0);
            expect(moves.length).toBe(0);
        });
    });

    describe("Player1 Pawn Moves ", function(){
        beforeEach(function(){
            game.board = [
            [null, null, null, null,null, null, null, null],
            [null, null, null, null,null, null, null, null],
            [null, null, null, null,null, null, null, null],
            [null, null, null, null,null, null, null, null],
            [null, null, null, null,null, null, null, null],
            [null, null, null, null,null, null, null, null],
            [null, null, null, null,null, null, null, null],
            [null, null, null, null,null, null, null, null]];
        });

        it("should allow you to move 1 forward when nothing is in front of you", function(){

            game.board[4][5] = pieceService.createPawn(player1);
        
            var moves = game.getValidMovesForPiece(4, 5);
            expect(moves.length).toBe(1);
            expect(moves).toContain({x:5, y:3});
      
        });


        it("should not allow you to move forward when a friendly peice is in front of you", function(){

            game.board[4][5] = pieceService.createPawn(player1);
            game.board[3][5] = pieceService.createPawn(player1);

            var moves = game.getValidMovesForPiece(4, 5);
            expect(moves.length).toBe(0);

        });

        it("should not allow you to move forward when an enemy peice is in front of you", function(){
            
            game.board[4][5] = pieceService.createPawn(player1);
            game.board[3][5] = pieceService.createPawn(player2);

            var moves = game.getValidMovesForPiece(4, 5);
            expect(moves.length).toBe(0);
        });

        it("should allow you to attack left diagonal when an enemy is there", function(){

            game.board[4][5] = pieceService.createPawn(player1);
            game.board[3][5] = pieceService.createPawn(player1);
            game.board[3][4] = pieceService.createPawn(player2);

            var moves = game.getValidMovesForPiece(4, 5);
            expect(moves.length).toBe(1);
            expect(moves.length).toBe(1);
            expect(moves).toContain({x:4, y:3});

        });

        it("should not allow you to attack left diagonal when an enemy is there", function(){
            
            game.board[4][5] = pieceService.createPawn(player1);
            game.board[3][5] = pieceService.createPawn(player1);
            game.board[3][4] = pieceService.createPawn(player1);

            var moves = game.getValidMovesForPiece(4, 5);
            expect(moves.length).toBe(0);
        });

         it("should allow you to attack right diagonal when an enemy is there", function(){

            game.board[4][5] = pieceService.createPawn(player1);
            game.board[3][5] = pieceService.createPawn(player1);
            game.board[3][6] = pieceService.createPawn(player2);

            var moves = game.getValidMovesForPiece(4, 5);
            expect(moves.length).toBe(1);
            expect(moves.length).toBe(1);
            expect(moves).toContain({x:6, y:3});

        });

        it("should not allow you to attack left diagonal when an enemy is there", function(){
            
            game.board[4][5] = pieceService.createPawn(player1);
            game.board[3][5] = pieceService.createPawn(player1);
            game.board[3][6] = pieceService.createPawn(player1);

            var moves = game.getValidMovesForPiece(4, 5);
            expect(moves.length).toBe(0);
        });
    });

    describe("Player2 Pawn Moves ", function(){
        beforeEach(function(){
            game.board = [
            [null, null, null, null,null, null, null, null],
            [null, null, null, null,null, null, null, null],
            [null, null, null, null,null, null, null, null],
            [null, null, null, null,null, null, null, null],
            [null, null, null, null,null, null, null, null],
            [null, null, null, null,null, null, null, null],
            [null, null, null, null,null, null, null, null],
            [null, null, null, null,null, null, null, null]];
        });

        it("should allow you to move 1 forward when nothing is in front of you", function(){

            game.board[4][5] = pieceService.createPawn(player2);
        
            var moves = game.getValidMovesForPiece(4, 5);
            expect(moves.length).toBe(1);
            expect(moves).toContain({x:5, y:5});
      
        });


        it("should not allow you to move forward when a friendly peice is in front of you", function(){

            game.board[4][5] = pieceService.createPawn(player2);
            game.board[5][5] = pieceService.createPawn(player2);

            var moves = game.getValidMovesForPiece(4, 5);
            expect(moves.length).toBe(0);

        });

        it("should not allow you to move forward when an enemy peice is in front of you", function(){
            
            game.board[4][5] = pieceService.createPawn(player2);
            game.board[5][5] = pieceService.createPawn(player1);

            var moves = game.getValidMovesForPiece(4, 5);
            expect(moves.length).toBe(0);
        });

        it("should allow you to attack left diagonal when an enemy is there", function(){

            game.board[4][5] = pieceService.createPawn(player2);
            game.board[5][5] = pieceService.createPawn(player2);
            game.board[5][4] = pieceService.createPawn(player1);

            var moves = game.getValidMovesForPiece(4, 5);
            expect(moves.length).toBe(1);
            expect(moves.length).toBe(1);
            expect(moves).toContain({x:4, y:4});

        });

        it("should not allow you to attack left diagonal when an enemy is there", function(){
            
            game.board[4][5] = pieceService.createPawn(player2);
            game.board[3][5] = pieceService.createPawn(player2);
            game.board[5][4] = pieceService.createPawn(player2);

            var moves = game.getValidMovesForPiece(4, 5);
            expect(moves.length).toBe(0);
        });

         it("should allow you to attack right diagonal when an enemy is there", function(){

            game.board[4][5] = pieceService.createPawn(player2);
            game.board[3][5] = pieceService.createPawn(player2);
            game.board[5][6] = pieceService.createPawn(player1);

            var moves = game.getValidMovesForPiece(4, 5);
            expect(moves.length).toBe(1);
            expect(moves.length).toBe(1);
            expect(moves).toContain({x:6, y:5});

        });

        it("should not allow you to attack left diagonal when an enemy is there", function(){
            
            game.board[4][5] = pieceService.createPawn(player2);
            game.board[3][5] = pieceService.createPawn(player2);
            game.board[5][6] = pieceService.createPawn(player2);

            var moves = game.getValidMovesForPiece(4, 5);
            expect(moves.length).toBe(0);
        });
    });

});
