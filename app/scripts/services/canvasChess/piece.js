'use strict';

angular.module('RFRecorder').
    factory('pieceService', [function(){

    function Piece(){

    }

    Piece.prototype = {
        draw: function(context, width, height, options, drawFunction){
            context.save();
            context.fillStyle= options.fillStyle;
            context.strokeStyle = options.strokeStyle;

            this.drawPiece(context, width, height, options);

            context.restore();
        }
    };
    function drawBase(context, width, height, options){
        var baseHeight = height/10,
            baseMargin = width/ 20,
            subBaseHeight = height/20,
            subBaseMargin = getBaseMargin(width);
        
        context.beginPath();
        context.rect(baseMargin , height - baseHeight, width - baseMargin* 2, baseHeight);
        context.rect(subBaseMargin, height - baseHeight - subBaseHeight,
                     width - subBaseMargin *2, subBaseHeight);
        context.closePath();
        context.fill();
        context.stroke();
    }

    function drawStem(context, width, height, options){
        var baseOffsetY = height *3 /20,
            subBaseMargin = getBaseMargin(width),
            curveHeight = height *12 /20,
            stemYTop = height - ( baseOffsetY + curveHeight),
            stemYBottom =  height - baseOffsetY,
            stemYCurvePt = (stemYBottom  + stemYTop) / 2;
        
        context.beginPath();
        context.moveTo(subBaseMargin,stemYBottom);
        context.quadraticCurveTo(width / 2 , stemYCurvePt, width / 2 - width / 5, stemYTop);
        context.lineTo(width / 2 + width / 5, stemYTop);
        context.quadraticCurveTo(width / 2 , stemYCurvePt, width - subBaseMargin, stemYBottom);
        context.closePath();
        context.fill();
        context.stroke();
    }

    function getBaseMargin(width){
        return width/8;
    }

    function Pawn(player){
        this.player = player;
    }

    function drawPawnHead(context, height, width, options){
        context.beginPath();
        context.arc(width/2, height*5/20, width / 5, 0, 2*Math.PI);
        context.closePath();        
        context.fill();
        context.stroke();
    }

    function drawPawn(context, width, height, options){
        drawBase(context, width, height, options);
        drawStem(context, width, height, options);
        drawPawnHead(context, width, height, options);
    }

    Pawn.prototype = new Piece();
    Pawn.prototype.drawPiece = drawPawn;

    function Rook(player){
        this.player = player;
    }

    function drawRookHead(context, width, height, options){
        var subBaseHeight = height/20,
            subBaseMargin = getBaseMargin(width),
            stemYTop = height - (height * 14/20),
            topBaseHeight = stemYTop - subBaseHeight,
            xTopStart = subBaseMargin,
            topWidth = (width - subBaseMargin *2),
            yMax = topBaseHeight * .1,
            parapitWidth = topWidth /4,
            notchHeight = topBaseHeight / 2,
            notchWidth = parapitWidth /2;
        
        
        context.beginPath();
        context.rect(xTopStart, topBaseHeight,
                     topWidth, subBaseHeight);
        context.closePath();        
        context.fill();
        context.stroke();
        
        context.beginPath();
        var x = xTopStart;
        context.moveTo(x, topBaseHeight);
        context.lineTo(x, yMax);
        x = x + parapitWidth; //0
        context.lineTo(x,  yMax);
        context.lineTo(x, notchHeight);
        x = x + notchWidth; //.5
        context.lineTo(x, notchHeight);
        context.lineTo(x, yMax);
        x = x + parapitWidth; //1
        context.lineTo(x, yMax);
        context.lineTo(x, notchHeight);
        x = x + notchWidth; //1.5
        context.lineTo(x, notchHeight);
        context.lineTo(x, yMax);
        x = x + parapitWidth; //2
        context.lineTo(x, yMax);
        context.lineTo(x, topBaseHeight);
        context.closePath();
        context.fill();
        context.stroke();   
    }

    function drawRook(context, width, height, options){
        drawBase(context, width, height, options);
        drawStem(context, width, height, options);
        drawRookHead(context, width, height, options);
    }

    Rook.prototype = new Piece();
    Rook.prototype.drawPiece = drawRook;

    function drawKnightHead(context, width, height, options){
        var subBaseMargin = getBaseMargin(width);
        var stemYBottom = height *17 /20;
        var baseMargin = width/ 20;
        var knightStemHeight = height *10 /20;

        context.beginPath();
        //chest
        context.moveTo(subBaseMargin, stemYBottom);
        var headRightX = width / 2 - subBaseMargin;
        context.lineTo(headRightX, knightStemHeight);
        
        //
        context.quadraticCurveTo(headRightX - subBaseMargin / 2, knightStemHeight - subBaseMargin, 
                                 headRightX - subBaseMargin, knightStemHeight);
        
        var arcPadding = 10;
        context.lineTo(subBaseMargin + arcPadding, 
                       knightStemHeight + (stemYBottom - knightStemHeight) /2 - arcPadding);
        context.arcTo(subBaseMargin + arcPadding, 
                      knightStemHeight + (stemYBottom - knightStemHeight) /2 - arcPadding,
                      subBaseMargin, 
                      knightStemHeight + (stemYBottom - knightStemHeight) /2 - arcPadding,
                     10);
        //context.lineTo(subBaseMargin, knightStemHeight );       
        context.arcTo(subBaseMargin, 
                      knightStemHeight + (stemYBottom - knightStemHeight) /2 - arcPadding,
                      subBaseMargin, 
                      knightStemHeight,
                     10);
        context.lineTo(headRightX, height * 3/20);
        context.arcTo(width - subBaseMargin *2, 
                      height * 3/20,
                      width - subBaseMargin *2, 
                      height/2,
                     height/2 - height * 4/20);
        //context.lineTo(width - subBaseMargin, stemYBottom)
        //context.lineTo(width - subBaseMargin, stemYBottom);
        context.quadraticCurveTo(width / 2 + subBaseMargin, height - (height/2 - height * 3/20), 
                                width - subBaseMargin, stemYBottom);
        
        context.stroke();
        context.fill();
    }
    
    function drawKnight(context, width, height, options){
        drawBase(context, width, height, options);
        drawKnightHead(context, width, height, options);

    }

    function Knight(player){
        this.player = player;
    }

    Knight.prototype = new Piece();
    Knight.prototype.drawPiece = drawKnight;


    function drawBishopHead(context, width, height, options){
        var subBaseHeight = height/20,
            subBaseMargin = getBaseMargin(width),
            stemYTop = height - (height * 11/20),
            topBaseHeight = stemYTop - subBaseHeight,
            xTopStart = subBaseMargin *2,
            topWidth = (width - subBaseMargin *4),
            xCurveStart = xTopStart + subBaseMargin,
            yMax = topBaseHeight * .1;
      
        context.beginPath();
        context.rect(xTopStart, topBaseHeight,
                     topWidth, subBaseHeight);
        context.closePath();        
        context.fill();
        context.stroke();

        context.beginPath();
        context.moveTo(xCurveStart, topBaseHeight);
        context.quadraticCurveTo(subBaseMargin, topBaseHeight * .75, width/2, yMax);
        context.quadraticCurveTo(width - subBaseMargin, topBaseHeight * .75, width - subBaseMargin * 3, topBaseHeight);
        context.closePath();
        context.fill();
        context.stroke();
    }

    function drawBishop(context, width, height, options){
        drawBase(context, width, height, options);
        drawStem(context, width, height, options);
        drawBishopHead(context, width, height, options);
    }

    function Bishop(player){
        this.player = player;
    }

    Bishop.prototype = new Piece();
    Bishop.prototype.drawPiece = drawBishop;

    function Queen(player){
        this.player = player;
    }

    function drawQueenHead(context, width, height, options){
        var subBaseHeight = height/20,
            subBaseMargin = getBaseMargin(width),
            stemYTop =  height - (height * 11/20),
            topBaseHeight = stemYTop - subBaseHeight,
            xTopStart = subBaseMargin *2,
            topWidth = (width - subBaseMargin *4),
            xHeadStart = xTopStart + subBaseMargin;

      
        context.beginPath();
        context.rect(xTopStart, topBaseHeight,
                     topWidth, subBaseHeight);
        context.closePath();        
        context.fill();
        context.stroke();

        context.beginPath();
        var crownTop =  topBaseHeight * .50;
        context.moveTo(xHeadStart, topBaseHeight);
        context.lineTo(subBaseMargin, crownTop);
        context.lineTo(width - subBaseMargin,crownTop);
        context.lineTo(width - xHeadStart,topBaseHeight);
        context.closePath();
      
        context.fill();
        context.stroke();

        context.beginPath();
        var r = topBaseHeight * .25;
        context.arc(width/2, r ,  r , 0, 2*Math.PI);

        context.closePath();
        context.fill();
        context.stroke();
    }

    function drawQueen(context, width, height, options){
        drawBase(context, width, height, options);
        drawStem(context, width, height, options);
        drawQueenHead(context, width, height, options);
    }

    Queen.prototype = new Piece();
    Queen.prototype.drawPiece = drawQueen;

    function drawKingHead(context, width, height, options){
        var subBaseHeight = height/20,
            subBaseMargin = getBaseMargin(width),
            stemYTop = height - (height * 11/20),
            topBaseHeight = stemYTop - subBaseHeight,
            xTopStart = subBaseMargin *2,
            topWidth = (width - subBaseMargin *4),
            xHeadStart = xTopStart + subBaseMargin;

      
        context.beginPath();
        context.rect(xTopStart, topBaseHeight,
                     topWidth, subBaseHeight);
        context.closePath();        
        context.fill();
        context.stroke();

        context.beginPath();
        var crownTop =  topBaseHeight * .50;
        context.moveTo(xHeadStart, topBaseHeight);
        context.lineTo(subBaseMargin, crownTop);
        context.lineTo(width - subBaseMargin,crownTop);
        context.lineTo(width - xHeadStart,topBaseHeight);
        context.closePath();
      
        context.fill();
        context.stroke();

        context.beginPath();
        var thickness = 1;
        var sideLength = crownTop / 2 - thickness;
        var mid = width / 2;

        crossWidth = 10;
        crossMiddleY = crownTop / 2;
        
        context.moveTo(mid - thickness, crownTop);
        context.lineTo(mid - thickness, crossMiddleY + thickness);
        context.lineTo(mid - thickness - sideLength, crossMiddleY + thickness);
        context.lineTo(mid - thickness - sideLength, crossMiddleY - thickness);
        context.lineTo(mid - thickness, crossMiddleY - thickness);
        context.lineTo(mid - thickness, 0 );
        context.lineTo(mid + thickness, 0 );
        context.lineTo(mid + thickness, crossMiddleY - thickness);
        context.lineTo(mid + thickness + sideLength, crossMiddleY - thickness);
        context.lineTo(mid + thickness + sideLength, crossMiddleY + thickness);
        context.lineTo(mid + thickness, crossMiddleY + thickness);
        context.lineTo(mid + thickness, crownTop );

        
        context.closePath();
        context.fill();
        context.stroke();
    }

    function drawKing(context, width, height, options){
        drawBase(context, width, height, options);
        drawStem(context, width, height, options);
        drawKingHead(context, width, height, options);
    }

    function King(player){
        this.player = player;
    }

    King.prototype = new Piece();
    King.prototype.drawPiece = drawKing;

    function createPiece(pieceType, player){
        return new pieceType(player);
    }
    return {
        createPawn: function createPawn(player){ return createPiece(Pawn, player);},
        createKnight: function createKnight(player){ return createPiece(Knight, player);},
        createBishop: function createBishop(player){ return createPiece(Bishop, player);},
        createRook: function createRook(player){ return createPiece(Rook, player);},
        createQueen: function createQueen(player){ return createPiece(Queen, player);},
        createKing: function createKing(player){ return createPiece(King, player);}
    };
}]);