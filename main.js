var FPS = 30; // target frames per second
var SECONDSBETWEENFRAMES = 1 / FPS;

var canvas = null;
var ctx = null;

var player = null;
var field = null;

function update(){
    if(player != null){
        player.update(field);
    }
}

function draw(ctx){
    ctx.fillStyle = 'green';
 
    ctx.fillRect(0,0,canvas.width, canvas.height);
    field.draw(ctx);
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
    // field.screen_width = canvas.width;
    // field.screen_height = canvas.height
    field = new Field(canvas.width, canvas.height);

    ctx = canvas.getContext('2d');
    player = new Player();

    $(document).keydown(onKeyDown);
    $(document).keyup(onKeyUp);

    setInterval(gameloop, SECONDSBETWEENFRAMES*1000);
});