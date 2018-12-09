var FPS = 30; // target frames per second
var SECONDSBETWEENFRAMES = 1 / FPS;

var canvas = null;
var ctx = null;

var player = null;

function update(){
    if(player != null){
        player.update();
    }
}

function draw(ctx){
    ctx.fillStyle = 'green';
    ctx.fillRect(0,0,canvas.width, canvas.height);
        
    player.draw(ctx);
    // ctx.beginPath();
    // ctx.moveTo(200,200);
    // ctx.lineTo(100,100);
    // ctx.stroke();
}

function gameloop(){
    update();
    draw(ctx);
}

$(document).ready(function(){
    console.log("Setting up game");
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    player = new Player();

    $(document).keydown(onKeyDown);
    $(document).keyup(onKeyUp);

    setInterval(gameloop, SECONDSBETWEENFRAMES*1000);
});