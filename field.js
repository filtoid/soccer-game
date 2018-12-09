function Field(_screen_width, _screen_height){
    this.screen_dim = new Location(_screen_width, _screen_height);
    this.size = new Location(750, 1020);
    this.pitchsize = new Location(730, 1000);

    this.offset = new Location(0,0);

    this.update = FieldUpdate;
    this.draw = FieldDraw;
}

function FieldUpdate(){

}

function FieldDraw(ctx){
    // Centre circle
    ctx.strokeStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc( (this.size.x/2) - this.offset.x, (this.size.y/2) - this.offset.y, 50, 0 , 2*Math.PI);
    ctx.moveTo(10 - this.offset.x, (this.size.y/2)-this.offset.y);
    // top half of the pitch
    ctx.lineTo(this.pitchsize.x - this.offset.x, (this.size.y/2)-this.offset.y);
    ctx.lineTo(this.pitchsize.x - this.offset.x, 10-this.offset.y);
    ctx.lineTo(10 - this.offset.x, 10-this.offset.y);
    ctx.lineTo(10 - this.offset.x, (this.size.y/2)-this.offset.y);    

    // bottom half of the pitch
    ctx.lineTo(10 - this.offset.x, (this.pitchsize.y+10)-this.offset.y);
    ctx.lineTo(this.pitchsize.x - this.offset.x,(this.pitchsize.y+10)-this.offset.y);
    ctx.lineTo(this.pitchsize.x - this.offset.x, (this.size.y/2)-this.offset.y);
    // top goal
    var goalwidth = 150; // Prescribed length = 7.32m (73.2)
    ctx.moveTo( 10 + (this.pitchsize.x/2) - (goalwidth/2) - this.offset.x, 15 - this.offset.y);
    ctx.lineTo( 10 + (this.pitchsize.x/2) - (goalwidth/2) - this.offset.x, 6 - this.offset.y);
    ctx.lineTo( 10 + (this.pitchsize.x/2) + (goalwidth/2) - this.offset.x, 6 - this.offset.y);
    ctx.lineTo( 10 + (this.pitchsize.x/2) + (goalwidth/2) - this.offset.x, 15 - this.offset.y);
    // bottom goal
    ctx.moveTo( 10 + (this.pitchsize.x/2) - (goalwidth/2) - this.offset.x, (this.pitchsize.y + 8) - this.offset.y);
    ctx.lineTo( 10 + (this.pitchsize.x/2) - (goalwidth/2) - this.offset.x, (this.pitchsize.y + 16)- this.offset.y);
    ctx.lineTo( 10 + (this.pitchsize.x/2) + (goalwidth/2) - this.offset.x, (this.pitchsize.y + 16) - this.offset.y);
    ctx.lineTo( 10 + (this.pitchsize.x/2) + (goalwidth/2) - this.offset.x, (this.pitchsize.y + 8) - this.offset.y);
    
    // Top 6 yard box
    var sixyardboxsize = 200;
    ctx.moveTo( 10 + (this.pitchsize.x/2) - (sixyardboxsize/2) - this.offset.x, 10 - this.offset.y);
    ctx.lineTo( 10 + (this.pitchsize.x/2) - (sixyardboxsize/2) - this.offset.x, 60 - this.offset.y);
    ctx.lineTo( 10 + (this.pitchsize.x/2) + (sixyardboxsize/2) - this.offset.x, 60 - this.offset.y);
    ctx.lineTo( 10 + (this.pitchsize.x/2) + (sixyardboxsize/2) - this.offset.x, 10 - this.offset.y);
    // Bottom 6 yard box
    ctx.moveTo( 10 + (this.pitchsize.x/2) - (sixyardboxsize/2) - this.offset.x, (this.pitchsize.y + 10) - this.offset.y);
    ctx.lineTo( 10 + (this.pitchsize.x/2) - (sixyardboxsize/2) - this.offset.x, (this.pitchsize.y - 40) - this.offset.y);
    ctx.lineTo( 10 + (this.pitchsize.x/2) + (sixyardboxsize/2) - this.offset.x, (this.pitchsize.y - 40) - this.offset.y);
    ctx.lineTo( 10 + (this.pitchsize.x/2) + (sixyardboxsize/2) - this.offset.x, (this.pitchsize.y + 10) - this.offset.y);
    
    // Top 6 yard box
    var penaltyboxsize = 400;
    ctx.moveTo( 10 + (this.pitchsize.x/2) - (penaltyboxsize/2) - this.offset.x, 10 - this.offset.y);
    ctx.lineTo( 10 + (this.pitchsize.x/2) - (penaltyboxsize/2) - this.offset.x, 200 - this.offset.y);
    ctx.lineTo( 10 + (this.pitchsize.x/2) + (penaltyboxsize/2) - this.offset.x, 200 - this.offset.y);
    ctx.lineTo( 10 + (this.pitchsize.x/2) + (penaltyboxsize/2) - this.offset.x, 10 - this.offset.y);
    
    ctx.moveTo( 10 + (this.pitchsize.x/2) - (penaltyboxsize/2) - this.offset.x, (this.pitchsize.y + 10) - this.offset.y);
    ctx.lineTo( 10 + (this.pitchsize.x/2) - (penaltyboxsize/2) - this.offset.x, (this.pitchsize.y - 180) - this.offset.y);
    ctx.lineTo( 10 + (this.pitchsize.x/2) + (penaltyboxsize/2) - this.offset.x, (this.pitchsize.y - 180) - this.offset.y);
    ctx.lineTo( 10 + (this.pitchsize.x/2) + (penaltyboxsize/2) - this.offset.x, (this.pitchsize.y + 10) - this.offset.y);
        
    ctx.stroke();

    // Top D
    ctx.beginPath();  
    ctx.arc( (this.size.x/2) - this.offset.x,  200 - this.offset.y, 20, 0 , Math.PI);
    ctx.stroke();

    // Bottom D
    ctx.beginPath();
    ctx.arc( (this.size.x/2) - this.offset.x,  (this.pitchsize.y + 10) - 190 - this.offset.y, 20, Math.PI, 0 );
    ctx.stroke();

    ctx.beginPath();
    // Top Penalty Box spot    
    ctx.arc( (this.size.x/2) - this.offset.x, 100 - this.offset.y, 2, 0 , 2*Math.PI);
    ctx.stroke();

    ctx.beginPath();
    // Bottom Penalty Box spot    
    ctx.arc( (this.size.x/2) - this.offset.x, (this.pitchsize.y + 10) - 100 - this.offset.y, 2, 0 , 2*Math.PI);
    ctx.stroke();

}