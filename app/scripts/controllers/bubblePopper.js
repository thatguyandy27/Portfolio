
const BubblePopperCtrl = function (bubbleService, $scope) {
    var bubbles = [];
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d'),
        animationFrameId;

    var Bubble = bubbleService.Bubble,
        Vector2D = bubbleService.Vector2D;


    $scope.canvasClick= function canvasClick(e){
        var position = getCursorPosition(e);

        for (var i = bubbles.length - 1; i >=0; i--){
            var bubble = bubbles[i];
            if (bubble.state == Bubble.States.Active){
                if (bubble.isPointOnBubble(position)){
                    bubble.state = Bubble.States.Popping;
                    playAudio();
                    break;
                }
            }
        }
    };


    var playIndex = 0;
    function playAudio(){
        var audio = document.getElementById('popAudio' + playIndex);
        audio.play();
        playIndex++;
        if (playIndex >= 4){
            playIndex = 0;
        }
    }

    function getCursorPosition(e) {
        var x;
        var y;
        if (e.pageX || e.pageY) {
            x = e.pageX;
            y = e.pageY;
        } else {
            x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }

        x -= e.target.offsetLeft;
        y -= e.target.offsetTop;

        return {
            x: x,
            y: y
        };
    }

    function move(){
        context.clearRect(0,0,canvas.width, canvas.height);
        var indexToRemove = -1;
        for(var i =0; i < bubbles.length; i++){
            var bubble = bubbles[i];
            if (bubble.state == Bubble.States.Active){
                bubble.pos2D = bubble.pos2D.addScaled(bubble.velo2D, 1);
                if(bubble.pos2D.x > canvas.width + bubble.radius){
                    bubble.x = 0 - bubble.radius;
                }
                if(bubble.pos2D.x < - bubble.radius){
                    bubble.x = canvas.width + bubble.radius;
                }
                if(bubble.pos2D.y > canvas.height + bubble.radius){
                    bubble.y = 0 - bubble.radius;
                }
                if(bubble.pos2D.y < - bubble.radius){
                    bubble.y = canvas.height + bubble.radius;
                }
            }
            else if (bubble.state === Bubble.States.Inactive){
                indexToRemove = i;
                continue;
            }


            bubble.draw(context);
        }
        if (indexToRemove >= 0){
            bubbles.splice(indexToRemove, 1);
        }

        animationFrameId = requestAnimationFrame(move) || animationFrameId;    
    }

    $scope.init = function init(){
        for(var i =0; i < $scope.bubbleCount; i++){
                var radius = (Math.random() + 2)* 20;
                var color = 'hsl(' + Math.random() * 360 + ',100%, 50%)';
                var bubble = new Bubble(radius, color, 1, 0, true);
                bubble.pos2D = new Vector2D(canvas.width/2, canvas.height/2);
                bubble.velo2D = new Vector2D( (Math.random() - .5)*2, 
                    (Math.random() - .5) *2 );
                bubble.draw(context);
                bubbles.push(bubble);
            }

    }

    $scope.bubbleCount = 50;

    $scope.init();

    animationFrameId = requestAnimationFrame(move);

    $scope.$on('$destroy', function onDestroy() {
        cancelAnimationFrame(animationFrameId);
    });

};

BubblePopperCtrl.$inject = ['bubbleService', '$scope'];

export default BubblePopperCtrl;

