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
   
    ctx.stroke();



}