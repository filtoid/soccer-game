function Player(){
    this.update = PlayerUpdate;
    this.draw = PlayerDraw;
    this.loc = new Location(100, 100);
}

function PlayerUpdate(){
    
    if(isKeyPressed('D')){
        this.loc.x += 2;
    }
    if(isKeyPressed('A')){
        this.loc.x -= 2;
    }
    if(isKeyPressed('W')){
        this.loc.y -= 2;
    }
    if(isKeyPressed('S')){
        this.loc.y += 2;
    }
}

function PlayerDraw(ctx){
    ctx.fillStyle = "#233147";
    ctx.fillRect(this.loc.x, this.loc.y, 25, 25);
}