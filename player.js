function Player(){
    this.update = PlayerUpdate;
    this.draw = PlayerDraw;
    this.loc = new Location(365, 500);
    this.size = new Location(25, 25);
    this.field = null;
}

function PlayerUpdate(field){
    this.field = field;
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
    if(this.loc.x < 0){
        this.loc.x = 0;
    }
    if(this.loc.x > field.size.x){
        this.loc.x = field.size.x;
    }
    if(this.loc.y< 0){
        this.loc.y = 0;
    }
    if(this.loc.y > field.size.y){
        this.loc.y = field.size.y;
    }

    if(this.loc.x > (field.screen_dim.x/2) ){
        field.offset.x = this.loc.x - (field.screen_dim.x/2);
    }
    if( this.loc.y > (field.screen_dim.y/2) ){
        field.offset.y = this.loc.y - (field.screen_dim.y/2);
    } 
}

function PlayerDraw(ctx, field){
    ctx.fillStyle = "#233147";
    var draw_x = this.loc.x;
    if(this.loc.x > (this.field.screen_dim.x /2)){
        draw_x =  (this.field.screen_dim.x /2);
    }
    var draw_y = this.loc.y;
    if(this.loc.x > (this.field.screen_dim.y /2)){
        draw_y =  (this.field.screen_dim.y /2);
    }
    
    ctx.fillRect(draw_x-(this.size.x/2), draw_y - (this.size.y/2), this.size.x, this.size.y);
}