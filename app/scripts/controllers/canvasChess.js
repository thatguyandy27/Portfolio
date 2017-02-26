
const CanvasChessCtrl = function ($scope, boardService, playerService, gameService) {

    var board = boardService.createBoard();

    var context = angular.element('#canvas')[0].getContext('2d');
    var selectedPiece = null;

    $scope.newGame = function newGame(){

        $scope.game = gameService.newGame(playerService.newPlayer("local", {name: "Player1"}), 
            playerService.newPlayer("local", {name: "Player2"}));
    };

    function drawBoard(){
        board.drawBoard(context, [$scope.lightTileColor,$scope.darkTileColor]);
        
        if(game != null){
            for (var y = 0; y < game.board.length; y++) {
                var row = game.board[y];
       
                for(var x= 0; x< row.length; x++){
                    if (row[x] !== null){
                        var options = {
                            fillStyle: player1FillColor,
                            strokeStyle: player1OutlineColor
                        };

                        if (row[x].player !== game.player1){
                            options.fillStyle = player2FillColor;
                            options.strokeStyle = player2OutlineColor;
                        }

                        board.drawPiece(context, x, y, function(context, tileWidth, tileHeight, options){ 
                            row[x].draw.call(row[x], context, tileWidth, tileHeight, options); 
                        }, options);
                    }
                }
            };
        }
    }

    $scope.lightTileColor = '#FFFFFF';
    $scope.darkTileColor = "#000000";
    $scope.player1FillColor = '#FFFFFF';
    $scope.player1OutlineColor = "#000000";
    $scope.player2OutlineColor = '#FFFFFF';
    $scope.player2FillColor = "#000000";

    $scope.$watch('lightTileColor',function(){
        drawBoard();
    });
    $scope.$watch('darkTileColor',function(){
        drawBoard();
    });

    $scope.$watch('player1FillColor',function(){
        drawBoard();
    });
    $scope.$watch('player1OutlineColor',function(){
        drawBoard();
    });

    $scope.$watch('player2FillColor',function(){
        drawBoard();
    });
    $scope.$watch('player2OutlineColor',function(){
        drawBoard();
    });

    drawBoard();
};

CanvasChessCtrl.$inject = ['$scope', 'boardService', 'playerService', 'gameService'];

export default CanvasChessCtrl;
