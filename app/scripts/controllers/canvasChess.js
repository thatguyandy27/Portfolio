'use strict';

/**
 * @ngdoc function
 * @name portfolioApp.controller:CsssolarsystemCtrl
 * @description
 * # CsssolarsystemCtrl
 * Controller of the portfolioApp
 */
angular.module('portfolioApp')
  .controller('CanvasChessCtrl', ['$scope', 'boardService', 'pieceService', function ($scope, boardService, pieceService) {

    var board = boardService.createBoard();

    var pieces = [[null, null, null, null,null, null, null, null],
                [null, null, null, null,null, null, null, null],
                [null, null, null, null,null, null, null, null],
                [null, null, null, null,null, null, null, null],
                [null, null, null, null,null, null, null, null],
                [null, null, null, null,null, null, null, null],
                [null, null, null, null,null, null, null, null],
                [null, null, null, null,null, null, null, null]];
    $scope.isGameActive = false;


    $scope.newGame = function newGame(){
        pieces[0][0] = new window.Rook(player2);
        pieces[0][7] = new window.Rook(player2);

        pieces[7][0] = new window.Rook(player1);
        pieces[7][7] = new window.Rook(player1);


        $scope.isGameActive = true;
    };

    $scope.lightColor = '#FFFFFF';
    
  }]);
