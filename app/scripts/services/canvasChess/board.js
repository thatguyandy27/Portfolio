'use strict';

angular.module('portfolioApp').
    factory('boardService', [function(){

    var X_START = 10,
        Y_START = 10,
        WIDTH = 500,
        HEIGHT = 500,
        X_COUNT = 8,
        Y_COUNT = 8;

    function Board(xStart, yStart, width, height, xCount, yCount){
        this.xStart = xStart;
        this.yStart = yStart;
        this.width = width;
        this.height = height;
        this.xCount = xCount;
        this.yCount = yCount;

    }

    function getTileWidth(board){
        return board.width / board.xCount;
    }
    function getTileHeight(board){
        return board.height / board.yCount;
    }

    function drawBoard(context, colors){
        var colorMod=colors.length,
            tileWidth = getTileWidth(this),
            tileHeight = this.height / this.yCount,
            y0 = 0,
            x0 = 0;


        context.save();
        context.clearRect(this.xStart, this.yStart, this.width, this.height);

        context.translate(this.xStart, this.yStart);
        
        for(var y = 0; y < this.yCount; y++){
            x0 = 0;
            for(var x =0; x< this.xCount; x++){
                
                //log.innerHTML += (x+y) % colorMod + "<br/>" ;
                context.fillStyle = colors[(x+y) % colorMod];
                
                context.strokeStyle='black';
                context.beginPath();
                context.rect(x0,y0,tileWidth, tileHeight);
                context.closePath();
                
                context.fill();
                context.stroke();
                x0 += tileWidth;
            }
            y0 += tileHeight;
        }

        context.restore();

    }

    function drawPiece(context, xIndex, yIndex, drawFunction, options){
        context.save();
        var tileWidth = getTileWidth(this),
            tileHeight =  getTileHeight(this);
        
        context.translate(this.xStart + xIndex * tileWidth,
            this.yStart + yIndex * tileHeight);

        drawFunction(context, tileWidth, tileHeight, options);
        context.restore();
    }

    Board.prototype = {
        draw:drawBoard,
        drawPiece : drawPiece

    };

    return {
        createBoard: function createBoard(){return new Board(X_START, Y_START, WIDTH, HEIGHT, X_COUNT, Y_COUNT);}
    };
}]);