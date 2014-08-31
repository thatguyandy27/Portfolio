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

    describe("The default board", function(){
        it("should have 8 pawns for player 1", function(){
            for(var i = 0; i < 8; i++){
                expect(game.board[6][i]).not.toBe(null);
                expect(game.board[6][i].player).toBe(player1);
                expect(game.board[6][i].getType()).toBe("pawn");
            }
        });

        it("should have 8 pawns for player 2", function(){
            for(var i = 0; i < 8; i++){
                expect(game.board[1][i]).not.toBe(null);
                expect(game.board[1][i].player).toBe(player2);
                expect(game.board[1][i].getType()).toBe("pawn");
            }
        });

        it("should have 2 rooks for player 1", function(){
            expect(game.board[7][0]).not.toBe(null);
            expect(game.board[7][0].player).toBe(player1);
            expect(game.board[7][0].getType()).toBe("rook");
            expect(game.board[7][7]).not.toBe(null);
            expect(game.board[7][7].player).toBe(player1);
            expect(game.board[7][7].getType()).toBe("rook");
        });

        it("should have 2 rooks for player 2", function(){
            expect(game.board[0][0]).not.toBe(null);
            expect(game.board[0][0].player).toBe(player2);
            expect(game.board[0][0].getType()).toBe("rook");
            expect(game.board[0][7]).not.toBe(null);
            expect(game.board[0][7].player).toBe(player2);
            expect(game.board[0][7].getType()).toBe("rook");

        });

        it ("should not have anyone in check", function(){
            expect(game.isPlayerInCheck(player1).length).toBe(0);
            expect(game.isPlayerInCheck(player1).length).toBe(0);
        });

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
        
            var moves = game.getValidMovesForPiece( 5,4);
            expect(moves.length).toBe(1);
            expect(moves).toContain({x:5, y:3});
      
        });


        it("should not allow you to move forward when a friendly peice is in front of you", function(){

            game.board[4][5] = pieceService.createPawn(player1);
            game.board[3][5] = pieceService.createPawn(player1);

            var moves = game.getValidMovesForPiece(5, 4);
            expect(moves.length).toBe(0);

        });

        it("should not allow you to move forward when an enemy peice is in front of you", function(){
            
            game.board[4][5] = pieceService.createPawn(player1);
            game.board[3][5] = pieceService.createPawn(player2);

            var moves = game.getValidMovesForPiece(5, 4);
            expect(moves.length).toBe(0);
        });

        it("should allow you to attack left diagonal when an enemy is there", function(){

            game.board[4][5] = pieceService.createPawn(player1);
            game.board[3][5] = pieceService.createPawn(player1);
            game.board[3][4] = pieceService.createPawn(player2);

            var moves = game.getValidMovesForPiece(5, 4);
            expect(moves.length).toBe(1);
            expect(moves.length).toBe(1);
            expect(moves).toContain({x:4, y:3});

        });

        it("should not allow you to attack left diagonal when an enemy is there", function(){
            
            game.board[4][5] = pieceService.createPawn(player1);
            game.board[3][5] = pieceService.createPawn(player1);
            game.board[3][4] = pieceService.createPawn(player1);

            var moves = game.getValidMovesForPiece(5, 4);
            expect(moves.length).toBe(0);
        });

         it("should allow you to attack right diagonal when an enemy is there", function(){

            game.board[4][5] = pieceService.createPawn(player1);
            game.board[3][5] = pieceService.createPawn(player1);
            game.board[3][6] = pieceService.createPawn(player2);

            var moves = game.getValidMovesForPiece(5, 4);
            expect(moves.length).toBe(1);
            expect(moves.length).toBe(1);
            expect(moves).toContain({x:6, y:3});

        });

        it("should not allow you to attack left diagonal when an enemy is there", function(){
            
            game.board[4][5] = pieceService.createPawn(player1);
            game.board[3][5] = pieceService.createPawn(player1);
            game.board[3][6] = pieceService.createPawn(player1);

            var moves = game.getValidMovesForPiece(5, 4);
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
        
            var moves = game.getValidMovesForPiece(5, 4);
            expect(moves.length).toBe(1);
            expect(moves).toContain({x:5, y:5});
      
        });


        it("should not allow you to move forward when a friendly peice is in front of you", function(){

            game.board[4][5] = pieceService.createPawn(player2);
            game.board[5][5] = pieceService.createPawn(player2);

            var moves = game.getValidMovesForPiece(5, 4);
            expect(moves.length).toBe(0);

        });

        it("should not allow you to move forward when an enemy peice is in front of you", function(){
            
            game.board[4][5] = pieceService.createPawn(player2);
            game.board[5][5] = pieceService.createPawn(player1);

            var moves = game.getValidMovesForPiece(5, 4);
            expect(moves.length).toBe(0);
        });

        it("should allow you to attack left diagonal when an enemy is there", function(){

            game.board[4][5] = pieceService.createPawn(player2);
            game.board[5][5] = pieceService.createPawn(player2);
            game.board[5][4] = pieceService.createPawn(player1);

            var moves = game.getValidMovesForPiece(5, 4);
            expect(moves.length).toBe(1);
            expect(moves.length).toBe(1);
            expect(moves).toContain({x:4, y:5});

        });

        it("should not allow you to attack left diagonal when an enemy is there", function(){
            
            game.board[4][5] = pieceService.createPawn(player2);
            game.board[5][5] = pieceService.createPawn(player2);
            game.board[5][4] = pieceService.createPawn(player2);

            var moves = game.getValidMovesForPiece(5, 4);
            expect(moves.length).toBe(0);
        });

         it("should allow you to attack right diagonal when an enemy is there", function(){

            game.board[4][5] = pieceService.createPawn(player2);
            game.board[5][5] = pieceService.createPawn(player2);
            game.board[5][6] = pieceService.createPawn(player1);


            var moves = game.getValidMovesForPiece(5, 4);
            expect(moves.length).toBe(1);
            expect(moves.length).toBe(1);
            expect(moves).toContain({x:6, y:5});

        });

        it("should not allow you to attack right diagonal when an enemy is not there", function(){
            
            game.board[4][5] = pieceService.createPawn(player2);
            game.board[5][5] = pieceService.createPawn(player2);
            game.board[5][6] = pieceService.createPawn(player2);

            var moves = game.getValidMovesForPiece(5, 4);
            expect(moves.length).toBe(0);
        });
    });

    describe("Knight moves", function(){
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


        it ("should allow for 8 moves when they are unoccupied", function(){
            for(var x = 3; x <6; x++){
                for (var y = 3; y < 6; y++){
                    game.board[y][x] = pieceService.createPawn(player1);
                }
            }
            game.board[4][4] = pieceService.createKnight(player1);

            var moves = game.getValidMovesForPiece(4,4);
            expect(moves.length).toBe(8);
            expect(moves).toContain({x:3, y:2});
            expect(moves).toContain({x:3, y:6});
            expect(moves).toContain({x:2, y:3});
            expect(moves).toContain({x:2, y:5});
            expect(moves).toContain({x:5, y:2});
            expect(moves).toContain({x:5, y:6});
            expect(moves).toContain({x:6, y:3});
            expect(moves).toContain({x:6, y:5});

        });

        it ("should allow for 8 moves when they are the other player", function(){
            for(var x = 2; x <7; x++){
                for (var y = 2; y < 7; y++){
                    game.board[y][x] = pieceService.createPawn(player2);
                }
            }
            game.board[4][4] = pieceService.createKnight(player1);

            var moves = game.getValidMovesForPiece(4,4);
            expect(moves.length).toBe(8);
            expect(moves).toContain({x:3, y:2});
            expect(moves).toContain({x:3, y:6});
            expect(moves).toContain({x:2, y:3});
            expect(moves).toContain({x:2, y:5});
            expect(moves).toContain({x:5, y:2});
            expect(moves).toContain({x:5, y:6});
            expect(moves).toContain({x:6, y:3});
            expect(moves).toContain({x:6, y:5});

        });


        it ("should allow for 0 moves when they are occupied by the same player", function(){
            for(var x = 2; x <7; x++){
                for (var y = 2; y < 7; y++){
                    game.board[y][x] = pieceService.createPawn(player1);
                }
            }
            game.board[4][4] = pieceService.createKnight(player1);

            var moves = game.getValidMovesForPiece(4,4);
            expect(moves.length).toBe(0);

        });


        it ("should not allow you to move off the board", function(){
            for(var x = 0; x <8; x++){
                for (var y = 0; y < 8; y++){
                    game.board[y][x] = pieceService.createPawn(player1);
                }
            }
            game.board[0][0] = pieceService.createKnight(player1);
            game.board[7][7] = pieceService.createKnight(player1);

            var moves = game.getValidMovesForPiece(0,0);
            expect(moves.length).toBe(0);

            moves = game.getValidMovesForPiece(7,7);
            expect(moves.length).toBe(0);

        });

    });

    
    describe("Rook Moves", function(){
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

        it("should allow you to move all the way to the right", function(){
            var pieces = [pieceService.createRook(player1),
                    pieceService.createQueen(player1)];
    
            for(var p = 0; p < pieces.length; p++){
                game.board[1][0] = pieceService.createPawn(player1);
                game.board[0][0] = pieces[p];
                game.board[1][1] = pieceService.createPawn(player1);

                var moves = game.getValidMovesForPiece(0,0);
                expect(moves.length).toBe(7);

                for (var i = 1; i < 8; i++) {
                    expect(moves).toContain({x:i, y:0});
                }


            }

        });

        it("should allow you to move all the way to the left", function(){
            var pieces = [pieceService.createRook(player1),
                pieceService.createQueen(player1)];

            for(var p = 0; p < pieces.length; p++){
                game.board[1][7] = pieceService.createPawn(player1);
                game.board[0][7] = pieces[p];
                game.board[1][6] = pieceService.createPawn(player1);

                var moves = game.getValidMovesForPiece(7,0);
                expect(moves.length).toBe(7);

                for (var i = 0; i < 7; i++) {
                    expect(moves).toContain({x:i, y:0});
                }
            }

        });

        it("should allow you to move all the way to the bottom", function(){
            var pieces = [pieceService.createRook(player1),
                pieceService.createQueen(player1)];

            for(var p = 0; p < pieces.length; p++){
                game.board[0][1] = pieceService.createPawn(player1);
                game.board[0][0] = pieces[p];
                game.board[1][1] = pieceService.createPawn(player1);

                var moves = game.getValidMovesForPiece(0,0);
                expect(moves.length).toBe(7);

                for (var i = 1; i < 8; i++) {
                    expect(moves).toContain({x:0, y:i});
                }
            }

        });

        it("should allow you to move all the way to the UP", function(){
            var pieces = [pieceService.createRook(player1),
                pieceService.createQueen(player1)];

            for(var p = 0; p < pieces.length; p++){
                game.board[7][1] = pieceService.createPawn(player1);
                game.board[7][0] = pieces[p];
                game.board[6][1] = pieceService.createPawn(player1);

                var moves = game.getValidMovesForPiece(0,7);
                expect(moves.length).toBe(7);

                for (var i = 0; i < 7; i++) {
                    expect(moves).toContain({x:0, y:i});
                }
            }

        });

        it ("should allow you to take opponent pieces", function(){
            var pieces = [pieceService.createRook(player1),
                pieceService.createQueen(player1)];

            for(var p = 0; p < pieces.length; p++){

                game.board[4][4] = pieces[p];
                game.board[3][3] = pieceService.createPawn(player1);
                game.board[3][5] = pieceService.createPawn(player1);
                game.board[5][5] = pieceService.createPawn(player1);
                game.board[5][3] = pieceService.createPawn(player1);

                game.board[2][4] = pieceService.createPawn(player2);
                game.board[6][4] = pieceService.createPawn(player2);
                game.board[4][2] = pieceService.createPawn(player2);
                game.board[4][6] = pieceService.createPawn(player2);
                
                var moves = game.getValidMovesForPiece(4,4);
                expect(moves.length).toBe(8);


                for(var i = 1; i <= 2; i++){
                    expect(moves).toContain({x:4 - i, y:4});
                    expect(moves).toContain({x:4 + i, y:4});
                    expect(moves).toContain({x:4 , y:4 - i});
                    expect(moves).toContain({x:4, y:4  + i});

                }
            }
        });
    });

    describe("Bishop Moves", function(){
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

        it("should allow you to move all the way to the bottom right", function(){
            var pieces = [{piece: pieceService.createBishop(player1), count: 7},
                    {piece: pieceService.createQueen(player1), count: 21}];
    
            for(var p = 0; p < pieces.length; p++){
              //  game.board[1][0] = pieceService.createPawn(player1);
                game.board[0][0] = pieces[p].piece;
              //  game.board[0][1] = pieceService.createPawn(player1);

                var moves = game.getValidMovesForPiece(0,0);
                expect(moves.length).toBe( pieces[p].count);

                for (var i = 1; i < 8; i++) {
                    expect(moves).toContain({x:i, y:i});
                }


            }

        });

        it("should allow you to move all the way to the bottom left", function(){
            var pieces = [{piece: pieceService.createBishop(player1), count: 7},
                    {piece: pieceService.createQueen(player1), count: 21}];
    
            for(var p = 0; p < pieces.length; p++){
              //  game.board[1][0] = pieceService.createPawn(player1);
                game.board[0][7] = pieces[p].piece;
              //  game.board[0][1] = pieceService.createPawn(player1);

                var moves = game.getValidMovesForPiece(7,0);
                expect(moves.length).toBe( pieces[p].count);

                for (var i = 1; i < 8; i++) {
                    expect(moves).toContain({x:7-i, y:i});
                }


            }

        });

        it("should allow you to move all the way to the top left", function(){
            var pieces = [{piece: pieceService.createBishop(player1), count: 7},
                    {piece: pieceService.createQueen(player1), count: 21}];
    
            for(var p = 0; p < pieces.length; p++){
              //  game.board[1][0] = pieceService.createPawn(player1);
                game.board[7][7] = pieces[p].piece;
              //  game.board[0][1] = pieceService.createPawn(player1);

                var moves = game.getValidMovesForPiece(7,7);
                expect(moves.length).toBe( pieces[p].count);

                for (var i = 0; i < 7; i++) {
                    expect(moves).toContain({x:i, y:i});
                }


            }

        });

        it("should allow you to move all the way to the top right", function(){
            var pieces = [{piece: pieceService.createBishop(player1), count: 7},
                    {piece: pieceService.createQueen(player1), count: 21}];
    
            for(var p = 0; p < pieces.length; p++){
              //  game.board[1][0] = pieceService.createPawn(player1);
                game.board[7][0] = pieces[p].piece;
              //  game.board[0][1] = pieceService.createPawn(player1);

                var moves = game.getValidMovesForPiece(0,7);
                expect(moves.length).toBe( pieces[p].count);

               for (var i = 1; i < 8; i++) {
                    expect(moves).toContain({x:i, y:7-i});
                }


            }

        });

        it ("should allow you to take opponent pieces", function(){
            var pieces = [{piece: pieceService.createBishop(player1), count: 8},
                    {piece: pieceService.createQueen(player1), count: 16}];

            game.board[2][2] = pieceService.createPawn(player2);
            game.board[2][3] = pieceService.createPawn(player2);
            game.board[2][4] = pieceService.createPawn(player2);
            game.board[2][5] = pieceService.createPawn(player2);
            game.board[2][6] = pieceService.createPawn(player2);

            game.board[3][2] = pieceService.createPawn(player2);
            game.board[4][2] = pieceService.createPawn(player2);
            game.board[5][2] = pieceService.createPawn(player2);
            game.board[6][2] = pieceService.createPawn(player2);

            game.board[6][3] = pieceService.createPawn(player2);
            game.board[6][4] = pieceService.createPawn(player2);
            game.board[6][5] = pieceService.createPawn(player2);
            game.board[6][6] = pieceService.createPawn(player2);

            game.board[5][6] = pieceService.createPawn(player2);
            game.board[4][6] = pieceService.createPawn(player2);
            game.board[3][6] = pieceService.createPawn(player2);

            for(var p = 0; p < pieces.length; p++){

                game.board[4][4] = pieces[p].piece;

                var moves = game.getValidMovesForPiece(4,4);
                expect(moves.length).toBe( pieces[p].count);

                for(var i = 1; i <= 2; i++){
                    expect(moves).toContain({x:4 - i, y:4 - i});
                    expect(moves).toContain({x:4 + i, y:4 - i});
                    expect(moves).toContain({x:4 + i, y:4 + i});
                    expect(moves).toContain({x:4 - i, y:4 + i});

                }
            }
        });
    });



    describe("King Moves", function(){

        beforeEach(function(){
            game.board = [
            [pieceService.createKing(player1), null, null, null,null, null, null, pieceService.createKing(player1)],
            [null, null, null, null,null, null, null, null],
            [null, null, pieceService.createPawn(player2), pieceService.createPawn(player2),pieceService.createPawn(player2), null, null, null],
            [null, null, pieceService.createPawn(player2), pieceService.createKing(player1),pieceService.createPawn(player2), null, null, null],
            [null, null, pieceService.createPawn(player2), pieceService.createPawn(player2),pieceService.createPawn(player2), null, null, null],
            [null, null, null, null,null, null, null, null],
            [null, null, null, null,null, null, null, null],
            [pieceService.createKing(player1), null, null, null,null, null, null, pieceService.createKing(player1)]];
        });

        it("should allow you to move down and to the right", function(){
         
            var moves = game.getValidMovesForPiece(0,0);
            expect(moves.length).toBe(3);

            expect(moves).toContain({x:1, y:0});
            expect(moves).toContain({x:1, y:1});
            expect(moves).toContain({x:0, y:1});

        });

        it("should allow you to move up and to the right", function(){
         
            var moves = game.getValidMovesForPiece(0,7);
            expect(moves.length).toBe(3);

            expect(moves).toContain({x:1, y:7});
            expect(moves).toContain({x:1, y:6});
            expect(moves).toContain({x:0, y:6});

        });

        it("should allow you to move up and to the left", function(){
         
            var moves = game.getValidMovesForPiece(7,7);
            expect(moves.length).toBe(3);

            expect(moves).toContain({x:6, y:7});
            expect(moves).toContain({x:6, y:6});
            expect(moves).toContain({x:7, y:6});

        });

        it("should allow you to move down and to the left", function(){
         
            var moves = game.getValidMovesForPiece(7,0);
            expect(moves.length).toBe(3);

            expect(moves).toContain({x:6, y:0});
            expect(moves).toContain({x:6, y:1});
            expect(moves).toContain({x:7, y:1});

        });

        it("should allow you to castle ", function(){
         
            //todo

        });

        it("should allow you to attack adjacent pieces ", function(){
         
            //todo
            var moves = game.getValidMovesForPiece(3,3);

            expect(moves.length).toBe(8);


            expect(moves).toContain({x:2, y:2});
            expect(moves).toContain({x:3, y:2});
            expect(moves).toContain({x:4, y:2});
            expect(moves).toContain({x:2, y:3});
            expect(moves).toContain({x:4, y:3});
            expect(moves).toContain({x:3, y:4});
            expect(moves).toContain({x:4, y:4});
            expect(moves).toContain({x:2, y:4});


        });
    });

    describe("finding kings", function(){

        beforeEach(function(){
            var pieces = [
                pieceService.createPawn(player1),
                pieceService.createKnight(player1),
                pieceService.createBishop(player1),
                pieceService.createRook(player1),
                pieceService.createQueen(player1),
                pieceService.createPawn(player2),
                pieceService.createKnight(player2),
                pieceService.createBishop(player2),
                pieceService.createRook(player2),
                pieceService.createQueen(player2)];

            for(var y = 0; y < 8; y++){
                for (var x= 0; x< 8 ; x++){
                    game.board[y][x] = pieces[ (x + y ) % pieces.length];
                }
            }

        });

        it ("should be able to find each king", function(){
            var x1 = 5,
                x2 = 3,
                y1 = 0,
                y2 = 7;

            game.board[y1][x1] = pieceService.createKing(player1);
            game.board[y2][x2] = pieceService.createKing(player2);

            expect(game.findKing(player1)).toEqual({x: x1, y:y1});
            expect(game.findKing(player2)).toEqual({x: x2, y:y2});

        });


        describe("determining if king is in check", function(){
            var king1Index,
                king2Index;

            beforeEach(function(){
                game.board = [
                [null, null, null, null,null, null, null, null],
                [null, null, null, null,null, null, null, null],
                [null, null, pieceService.createKing(player2), null,null, null, null, null],
                [null, null, null, null,null, null, null, null],
                [null, null, null, null,null, pieceService.createKing(player1), null, null],
                [null, null, null, null,null, null, null, null],
                [null, null, null, null,null, null, null, null],
                [null, null, null, null,null, null, null, null]];

                king1Index = {x:5, y:4, player: player1, opponent: player2},
                king2Index = {x:2, y:2, player: player2, opponent: player1};
            });

            it ("should have a default state of no one in check", function(){
                expect(game.isPlayerInCheck(player1).length).toBe(0);
                expect(game.isPlayerInCheck(player1).length).toBe(0);
            })

            it ("should be in check if the rook or queen is in the same row", function(){
                var tests= [king1Index, king2Index];

                for(var t =0; t < tests.length; t++){
                    var test = tests[t];
                    game.board[test.y][0] = pieceService.createRook(test.opponent);
                    game.board[test.y][7] = pieceService.createRook(test.opponent);
                    expect(game.isPlayerInCheck(test.player)).toContain({x:0, y:test.y});
                    expect(game.isPlayerInCheck(test.player)).toContain({x:7, y:test.y});

                    game.board[test.y][0] = pieceService.createQueen(test.opponent);
                    game.board[test.y][7] = pieceService.createQueen(test.opponent);
                    expect(game.isPlayerInCheck(test.player)).toContain({x:0, y:test.y});
                    expect(game.isPlayerInCheck(test.player)).toContain({x:7, y:test.y});

                }

            } );

            it ("should be in check if the rook or queen is in the same column", function(){
                var tests= [king1Index, king2Index];

                for(var t =0; t < tests.length; t++){
                    var test = tests[t];
                    game.board[0][test.x] = pieceService.createRook(test.opponent);
                    game.board[7][test.x]= pieceService.createRook(test.opponent);
                    expect(game.isPlayerInCheck(test.player)).toContain({x:test.x, y:0});
                    expect(game.isPlayerInCheck(test.player)).toContain({x:test.x, y:7});

                    game.board[0][test.x] = pieceService.createQueen(test.opponent);
                    game.board[7][test.x] = pieceService.createQueen(test.opponent);
                    expect(game.isPlayerInCheck(test.player)).toContain({x:test.x, y:0});
                    expect(game.isPlayerInCheck(test.player)).toContain({x:test.x, y:7});

                }

            } );


            it ("should not be in check if the rook or queen is in the same row and a piece blocks it", function(){
                var tests= [king1Index, king2Index];

                for(var t =0; t < tests.length; t++){
                    var test = tests[t];
                    game.board[test.y][0] = pieceService.createRook(test.opponent);
                    game.board[test.y][7] = pieceService.createQueen(test.opponent);
                    game.board[test.y][1] = pieceService.createPawn(test.opponent);
                    game.board[test.y][6] = pieceService.createPawn(test.opponent);
                   

                    expect(game.isPlayerInCheck(test.player).length).toBe(0);

                }

            } );


            it ("should not be in check if the rook or queen is in the same column and a piece blocks it", function(){
                var tests= [king1Index, king2Index];

                for(var t =0; t < tests.length; t++){
                    var test = tests[t];
                    game.board[0][test.x] = pieceService.createRook(test.opponent);
                    game.board[7][test.x]= pieceService.createRook(test.opponent);
                    game.board[1][test.x] = pieceService.createPawn(test.opponent);
                    game.board[6][test.x]= pieceService.createPawn(test.opponent);
                   

                    expect(game.isPlayerInCheck(test.player).length).toBe(0);


                }

            } );

            it ("should be in check if the bishop or queen is in the same diagonal", function(){
                var tests= [king1Index, king2Index];

                for(var t =0; t < tests.length; t++){
                    var test = tests[t];
                    var testPositions = [{x: test.x - 2, y: test.y - 2 },
                        {x: test.x - 2, y: test.y + 2 },
                        {x: test.x + 2, y: test.y + 2 },
                        {x: test.x + 2, y: test.y - 2 }];

                    for (var i = testPositions.length - 1; i >= 0; i--) {
                        game.board[testPositions[i].y][testPositions[i].x] = pieceService.createBishop(test.opponent);
                    }

                    var checkPositions = game.isPlayerInCheck(test.player);
                    for (var i = testPositions.length - 1; i >= 0; i--) {
                        expect(checkPositions).toContain(testPositions[i]);
                    }


                    for (var i = testPositions.length - 1; i >= 0; i--) {
                        game.board[testPositions[i].y][testPositions[i].x] = pieceService.createQueen(test.opponent);
                    }

                    checkPositions = game.isPlayerInCheck(test.player);
                    for (var i = testPositions.length - 1; i >= 0; i--) {
                        expect(checkPositions).toContain(testPositions[i]);
                    }

                }

            } );

            it ("should not be in check if the bishop or queen is in the same diagonal and a piece is blocking ", function(){
                var tests= [king1Index, king2Index];

               for(var t =0; t < tests.length; t++){
                    var test = tests[t];
                    game.board[test.y+1][test.x+1] = pieceService.createPawn(test.player);
                    game.board[test.y+1][test.x-1] = pieceService.createPawn(test.player);
                    game.board[test.y-1][test.x+1] = pieceService.createPawn(test.player);
                    game.board[test.y-1][test.x-1] = pieceService.createPawn(test.player);

                    var testPositions = [{x: test.x - 2, y: test.y - 2 },
                        {x: test.x - 2, y: test.y + 2 },
                        {x: test.x + 2, y: test.y + 2 },
                        {x: test.x + 2, y: test.y - 2 }];

                    for (var i = testPositions.length - 1; i >= 0; i--) {
                        game.board[testPositions[i].y][testPositions.x] = pieceService.createBishop(test.opponent);
                    }

                    expect(game.isPlayerInCheck(test.player).length).toBe(0);

                    for (var i = testPositions.length - 1; i >= 0; i--) {
                        game.board[testPositions[i].y][testPositions.x] = pieceService.createQueen(test.opponent);
                    }

                    expect(game.isPlayerInCheck(test.player).length).toBe(0);

                }


            } );

            
            it ("should be in check a if the knight is in the right position", function(){
                var tests= [king1Index, king2Index];

                for(var t =0; t < tests.length; t++){
                    var test = tests[t];

                    
                    for(var xIndex = 0; xIndex< 8; xIndex++){
                        for(var yIndex = 0; yIndex < 8; yIndex++){
                            if (game.board[yIndex][xIndex] === null ||game.board[yIndex][xIndex].getType() !== "king"){
                                game.board[yIndex][xIndex] = pieceService.createKnight(test.opponent);
                            }
                        }
                    }

                    var testPositions = [{x: test.x - 2, y: test.y - 1 },
                        {x: test.x - 1, y: test.y - 2 },

                        {x: test.x - 1, y: test.y + 2 },
                        {x: test.x - 2, y: test.y + 1 },
                        
                        {x: test.x + 2, y: test.y + 1 },
                        {x: test.x + 1, y: test.y + 2 },

                        {x: test.x + 2, y: test.y - 1 },
                        {x: test.x + 1, y: test.y - 2 }];

                    var checkPositions = game.isPlayerInCheck(test.player);
                    expect(checkPositions.length).toBe(8);

                    for (var i = testPositions.length - 1; i >= 0; i--) {
                        expect(checkPositions).toContain(testPositions[i]);
                    }

                }

            } );


        })

    });

    

});
